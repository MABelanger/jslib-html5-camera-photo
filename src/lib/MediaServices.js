/*
 * Constants
 */

// camera constants
const USER = 'user';
const ENVIRONMENT = 'environment';
const LEFT = 'left';
const RIGHT = 'right';

const SUPPORTED_FACING_MODES = [USER, ENVIRONMENT, LEFT, RIGHT];

const FACING_MODES = {
  'USER': USER,
  'ENVIRONMENT': ENVIRONMENT,
  'LEFT': LEFT,
  'RIGHT': RIGHT
};

// Image constants
const PNG = 'png';
const JPG = 'jpg';

const SUPPORTED_IMAGE_TYPES = [JPG, PNG];

const IMAGE_TYPES = {
  'PNG': PNG,
  'JPG': JPG
};

const FORMAT_TYPES = {
  [JPG]: 'image/jpeg',
  [PNG]: 'image/png'
};

/*
 * Private fct
 */
function _getImageSize (videoWidth, videoHeight, sizeFactor) {
  // calc the imageWidth
  let imageWidth = videoWidth * parseFloat(sizeFactor);
  // calc the ratio
  let ratio = videoWidth / imageWidth;
  // calc the imageHeight
  let imageHeight = videoHeight / ratio;

  return {
    imageWidth,
    imageHeight
  };
}

function _validateImgParam (imageType, compression) {
  if (!(compression >= 0 && compression <= 1)) {
    throw new Error(compression + ' is invalid compression, choose between: [0, 1]');
  }

  if (!SUPPORTED_IMAGE_TYPES.includes(imageType)) {
    throw new Error(imageType + ' is invalid imageType, choose between: ' + SUPPORTED_IMAGE_TYPES.join(', '));
  }
  return true;
}

function _getImgParam (imageType, compression) {
  let imgParam = {};
  try {
    _validateImgParam(imageType, compression);
    imgParam.imageType = imageType;
    imgParam.compression = compression;
  } catch (e) {
    console.error(e);
    console.error('default value of ' + PNG + ' is used');

    imgParam.imageType = PNG;
    imgParam.compression = null;
  }

  return imgParam;
}

function _getDataUri (canvas, imageType, compression) {
  const imgParam = _getImgParam(imageType, compression);

  if (imgParam.imageType === JPG) {
    return canvas.toDataURL(FORMAT_TYPES[JPG], compression);
  }

  return canvas.toDataURL(FORMAT_TYPES[imageType]);
}

class MediaServices {
  static getDataUri (videoElement, sizeFactor, imageType, compression) {
    let {videoWidth, videoHeight} = videoElement;
    let {imageWidth, imageHeight} = _getImageSize(videoWidth, videoHeight, sizeFactor);

    // Build the canvas size et draw the image to context from videoElement
    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

    // Get dataUri from canvas
    let dataUri = _getDataUri(canvas, imageType, compression);
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
      video: {
        width: {},
        height: {}
      }
    };

    const supports = navigator.mediaDevices.getSupportedConstraints();
    if (!supports.width || !supports.height || !supports.facingMode) {
      console.error('Constraint width height or facingMode not supported!');
      return idealConstraints;
    }

    // If is valid facingMode
    if (SUPPORTED_FACING_MODES.indexOf(idealFacingMode) > -1) {
      idealConstraints.video.facingMode = { ideal: idealFacingMode };
    }

    if (idealResolution.width) {
      idealConstraints.video.width.ideal = idealResolution.width;
    }

    if (idealResolution.height) {
      idealConstraints.video.height.ideal = idealResolution.height;
    }

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
      {'width': {'min': 2560}},
      {'width': {'min': 3840}}
    ];

    if (numberOfMaxResolutionTry >= VIDEO_ADVANCED_CONSTRANTS.length) {
      return null;
    }

    // each number of try, we remove the last value of the array (the bigger minim width)
    let advanced = VIDEO_ADVANCED_CONSTRANTS.slice(0, -numberOfMaxResolutionTry);
    constraints.video.advanced = advanced;

    return constraints;
  }

  static get FACING_MODES () {
    return FACING_MODES;
  }

  static get IMAGE_TYPES () {
    return IMAGE_TYPES;
  }
}

export default MediaServices;
