import MediaServices from './MediaServices';
import 'image-capture';

import {
  DEFAULT_SIZE_FACTOR,
  DEFAULT_IMAGE_COMPRESSION,
  DEFAULT_IMAGE_MIRROR } from './constants';

const DEFAULT_IMAGE_TYPE = MediaServices.IMAGE_TYPES.PNG;

class CameraPhoto {
  constructor (videoElement) {
    this.videoElement = videoElement;
    this.stream = null;
    this.numberOfMaxResolutionTry = 1;
    this.settings = null;
    this.captureDevice = null;
    this.availableFillLightModes = [];

    // Set the right object depending on the browser.
    this.windowURL = MediaServices.getWindowURL();
    this.mediaDevices = MediaServices.getNavigatorMediaDevices();
  }

  _getStreamDevice (idealFacingMode, idealResolution) {
    return new Promise((resolve, reject) => {
      let constraints =
          MediaServices.getIdealConstraints(idealFacingMode, idealResolution);

      this.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this._gotStream(stream);
          resolve(stream);
        })
        .catch((error) => {
          // let {name, constraint, message} = error;
          // window.alert(name + ' ' + constraint + ' ' + message);
          reject(error);
        });
    });
  }

  _getStreamDeviceMaxResolution (idealFacingMode) {
    let constraints =
        MediaServices.getMaxResolutionConstraints(idealFacingMode, this.numberOfMaxResolutionTry);

    // all the trying is done...
    if (constraints == null) {
      let idealResolution = {};
      return this._getStreamDevice(idealFacingMode, idealResolution);
    }

    return new Promise((resolve, reject) => {
      this.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this._gotStream(stream);
          resolve(stream);
        })
        .catch((error) => {
          // let {name, constraint, message} = error;
          // console.log(name + ' ' + constraint + ' ' + message);
          // retry...
          setTimeout(() => {
            this.numberOfMaxResolutionTry += 1;
            this._getStreamDeviceMaxResolution(idealFacingMode)
              .catch(() => {
                reject(error);
              });
          }, 20);
        });
    });
  }

  _setVideoSrc (stream) {
    if ('srcObject' in this.videoElement) {
      this.videoElement.srcObject = stream;
    } else {
      // using URL.createObjectURL() as fallback for old browsers
      let videoSrc = this.windowURL.createObjectURL(stream);
      this.videoElement.src = videoSrc;
    }
  }

  _setSettings (stream) {
    // default setting is null
    this.settings = null;
    const tracks = (stream && stream.getTracks)
      ? stream.getTracks()
      : [];

    if (tracks.length > 0 && tracks[0].getSettings) {
      this.settings = tracks[0].getSettings();
    }
  }

  _gotStream (stream) {
    this.stream = stream;

    const videoDevice = stream.getVideoTracks()[0];
    this.captureDevice = new window.ImageCapture(videoDevice);

    this.availableFillLightModes = this.captureDevice.getPhotoCapabilities().then(c => {
      alert(`light modes: ${JSON.stringify(c.fillLightMode)}`)
      return c.fillLightMode
    })


    this.availableFillLightModes.then(o => {
      alert(`setOptions? ${typeof this.captureDevice.setOptions}`)

      if (this.captureDevice.setOptions && o.includes("flash")) {
        alert("setting options")
        this.captureDevice.setOptions({ fillLightMode: "flash" }).catch(err => alert(`setOptions() failed: ${err.message}`));
      } else {
        alert("not setting options")
      }
    })


    // try {
    //   this.captureDevice.getPhotoCapabilities().then(c => alert(JSON.stringify(c)));
    // } catch (e) {
    //   console.error(e)
    // }

    // try {
    //   this.captureDevice.getPhotoSettings().then(s => alert(JSON.stringify(s)));
    // } catch(e) {
    //   console.error(e)
    // }


    this._setSettings(stream);
    this._setVideoSrc(stream);
  }

  getCameraSettings () {
    return this.settings;
  }

  startCamera (idealFacingMode, idealResolution) {
    // stop the stream before playing it.
    return this.stopCamera()
      .then(() => {})
      .catch(() => {})
      // Always called (when the promise is done)
      .then(() => {
        return this._getStreamDevice(idealFacingMode, idealResolution);
      });
  }

  startCameraMaxResolution (idealFacingMode = {}) {
    // stop the stream before playing it.
    return this.stopCamera()
      .then(() => {})
      .catch(() => {})
      // Always called (when the promise is done)
      .then(() => {
        return this._getStreamDeviceMaxResolution(idealFacingMode);
      });
  }

  getDataUri (userConfig) {
    // let config = {
    //   sizeFactor: userConfig.sizeFactor === undefined ? DEFAULT_SIZE_FACTOR : userConfig.sizeFactor,
    //   imageType: userConfig.imageType === undefined ? DEFAULT_IMAGE_TYPE : userConfig.imageType,
    //   imageCompression: userConfig.imageCompression === undefined ? DEFAULT_IMAGE_COMPRESSION : userConfig.imageCompression,
    //   isImageMirror: userConfig.isImageMirror === undefined ? DEFAULT_IMAGE_MIRROR : userConfig.isImageMirror
    // };

    // let dataUri = MediaServices.getDataUri(this.videoElement, config);
    return this.availableFillLightModes.then(fm => this.captureDevice.takePhoto({
      fillLightMode: fm.includes("flash") ? "flash" : undefined
    }))
    // return dataUri;
  }

  stopCamera () {
    return new Promise((resolve, reject) => {
      if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
        this.videoElement.src = '';
        this.stream = null;
        this._setSettings(null);
        resolve();
      }
      reject(Error('no stream to stop!'));
    });
  }
}

export const FACING_MODES = MediaServices.FACING_MODES;
export const IMAGE_TYPES = MediaServices.IMAGE_TYPES;

export default CameraPhoto;
