// https://github.com/webrtc/adapter
// https://webrtchacks.github.io/WebRTC-Camera-Resolution/
// https://webrtchacks.com/getusermedia-resolutions-3/
// https://github.com/addyosmani/getUserMedia.js
const SUPPORTED_FACING_MODES = ['user', 'environment', 'left', 'right'];

const FACING_MODES = {
  'USER': 'user',
  'ENVIRONMENT': 'environment',
  'LEFT': 'left',
  'RIGHT': 'right'
};

function _getImageSize (videoWidth, videoHeight, sizeFactor) {
  console.log('videoWidth, videoHeight:', videoWidth, videoHeight);

  // calc the imageWidth
  let imageWidth = videoWidth * parseFloat(sizeFactor);
  // calc the ratio
  let ratio = videoWidth / imageWidth;
  // calc the imageHeight
  let imageHeight = videoHeight / ratio;

  console.log('imageWidth, imageHeight, sizeFactor:', imageWidth, imageHeight, sizeFactor);

  return {
    imageWidth,
    imageHeight
  };
}

class MediaServices {
  static getDataUri (videoElement, sizeFactor) {
    let {videoWidth, videoHeight} = videoElement;
    let {imageWidth, imageHeight} = _getImageSize(videoWidth, videoHeight, sizeFactor);

    // Build the canvas size et draw the image to context from videoElement
    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

    // Get dataUri from canvas
    let dataUri = canvas.toDataURL('image/png');
    return dataUri;
  }

  static getWindowURL () {
    let windowURL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return windowURL;
  }

  /*
  Inspiration : https://github.com/jhuckaby/webcamjs/blob/master/webcam.js
  */
  static getNavigatorMediaDevices () {
    let NMDevice = null;
    let isNewAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    let isOldAPI = !!(navigator.mozGetUserMedia || navigator.webkitGetUserMedia);

    if (isNewAPI) {
      NMDevice = navigator.mediaDevices;
    } else if (isOldAPI) {
      let NMDeviceOld = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
      // Setup getUserMedia, with polyfill for older browsers
      // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

      let polyfillGetUserMedia = {
        getUserMedia: function (constraint) {
          return new Promise(function (resolve, reject) {
            NMDeviceOld.call(navigator, constraint, resolve, reject);
          });
        }
      };

      // Overwrite getUserMedia() with the polyfill
      NMDevice = Object.assign(NMDeviceOld,
        polyfillGetUserMedia
      );
    }

    // If is no navigator.mediaDevices || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
    // then is not supported so return null
    return NMDevice;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints
  static isSupportedFacingMode () {
    // navigator.mediaDevices
    return MediaServices.getNavigatorMediaDevices().getSupportedConstraints().facingMode;
  }

  static getIdealConstraints (idealFacingMode = {}, idealResolution = {}) {
    // default idealConstraints
    let idealConstraints = {
      audio: false,
      video: {}
    };

    const supports = navigator.mediaDevices.getSupportedConstraints();
    if (!supports.width || !supports.height || !supports.facingMode) {
      return idealConstraints;
    }

    if (SUPPORTED_FACING_MODES.indexOf(idealFacingMode) > -1) {
      idealConstraints.video.facingMode = { ideal: idealFacingMode };
    }

    if (idealResolution.width) {
      idealConstraints.video.width.ideal = idealResolution.width;
    }

    if (idealResolution.height) {
      idealConstraints.video.height.ideal = idealResolution.height;
    }

    console.log('idealConstraints', idealConstraints);

    return idealConstraints;
  }

  static getMaxResolutionConstraints (idealFacingMode = {}, numberOfMaxResolutionTry) {
    let constraints = MediaServices.getIdealConstraints(idealFacingMode);

    const VIDEO_ADVANCED_CONSTRANTS = [
      {'width': {'min': 640}},
      {'width': {'min': 800}},
      {'width': {'min': 900}},
      {'width': {'min': 1024}},
      {'width': {'min': 1080}},
      {'width': {'min': 1280}},
      {'width': {'min': 1920}},
      {'width': {'min': 2560}}
    ];

    if (numberOfMaxResolutionTry >= VIDEO_ADVANCED_CONSTRANTS.length) {
      return null;
    }

    let advanced = VIDEO_ADVANCED_CONSTRANTS.slice(0, -numberOfMaxResolutionTry);
    constraints.video.advanced = advanced;

    console.log('constraints', constraints);

    return constraints;
  }

  static get FACING_MODES () {
    return FACING_MODES;
  }
}

export default MediaServices;
