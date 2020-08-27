import MediaServices from './MediaServices';

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
    this.photoCapabilities = null;

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
    this.captureDevice = new ImageCapture(videoDevice, stream);
    this.photoCapabilities = this.captureDevice.getPhotoCapabilities();

    this._setSettings(stream);
    this._setVideoSrc(stream);
  }

  getCameraSettings () {
    return this.settings;
  }

  async getPhotoCapabilities() {
    return this.photoCapabilities;
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

  async getDataUri (userConfig) {
    const t = typeof this.captureDevice.track !== 'undefined' ? this.captureDevice.track : this.captureDevice.videoStreamTrack;

    const caps = await this.photoCapabilities;

    try {
      await t.applyConstraints({ advanced: [{ torch: (caps.torch && userConfig.torch) || false }] })
    } catch (e) {
      console.error(`unable to apply constraints: ${e.message}`)
    }

    return this.captureDevice.takePhoto()
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
