import MediaServices from './MediaServices';

class CameraPhoto {
  constructor (videoElement) {
    this.videoElement = videoElement;
    this.stream = null;

    // Set the right object depending on the browser.
    this.windowURL = MediaServices.getWindowURL();
    this.mediaDevices = MediaServices.getNavigatorMediaDevices();
  }

  _getStreamDevice (idealFacingMode, idealResolution, isMaxResolution) {
    return new Promise((resolve, reject) => {
      let idealConstraints =
          MediaServices.getIdealConstraints(idealFacingMode, idealResolution, isMaxResolution);

      this.mediaDevices.getUserMedia(idealConstraints)
        .then((stream) => {
          this._gotStream(stream);
          resolve(stream);
        })
        .catch((error) => {
          reject(error);
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

  _gotStream (stream) {
    this.stream = stream;
    this._setVideoSrc(stream);
  }

  startCamera (idealFacingMode = {}, idealResolution = {}) {
    // stop the stream before playing it.
    this.stopCamera().catch(() => {});
    let isMaxResolution = false;
    return this._getStreamDevice(idealFacingMode, idealResolution, isMaxResolution);
  }

  startCameraMaxResolution (idealFacingMode = {}) {
    // stop the stream before playing it.
    this.stopCamera().catch(() => {});
    let idealResolution = {};
    let isMaxResolution = true;
    return this._getStreamDevice(idealFacingMode, idealResolution, isMaxResolution);
  }

  getDataUri (sizeFactor = 1) {
    let dataUri = MediaServices.getDataUri(this.videoElement, sizeFactor);
    return dataUri;
  }

  stopCamera () {
    return new Promise((resolve, reject) => {
      if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
        this.videoElement.src = '';
        this.stream = null;
        resolve();
      }
      reject(Error('no stream to stop!'));
    });
  }

  get FACING_MODES () {
    return MediaServices.FACING_MODES;
  }
}

export default CameraPhoto;
