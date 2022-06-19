import { getImageSize, getDataUri, isMinimumConstraints, isIphoneOrIpad } from './helper';

import {
  SUPPORTED_FACING_MODES,
  FACING_MODES,
  IMAGE_TYPES,
  MINIMUM_CONSTRAINTS
} from './constants';

export class MediaServices {
  static getDataUri (videoElement, config) {
    let { sizeFactor, imageType, imageCompression, isImageMirror } = config;

    let { videoWidth, videoHeight } = videoElement;
    let { imageWidth, imageHeight } = getImageSize(videoWidth, videoHeight, sizeFactor);

    // Build the canvas size et draw the image to context from videoElement
    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');

    // Flip horizontally (as css transform: rotateY(180deg))
    if (isImageMirror) {
      context.setTransform(-1, 0, 0, 1, canvas.width, 0);
    }

    context.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

    // Get dataUri from canvas
    let dataUri = getDataUri(canvas, imageType, imageCompression);
    return dataUri;
  }

  static getWindowURL () {
    let windowURL =
      window.URL || window.webkitURL || window.mozURL || window.msURL;
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
      NMDevice = Object.assign(NMDeviceOld, polyfillGetUserMedia);
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

  static getIdealConstraints (idealCameraDevice, idealResolution) {
    // default idealConstraints

    let idealConstraints = MINIMUM_CONSTRAINTS;

    if (isMinimumConstraints(idealCameraDevice, idealResolution)) {
      return MINIMUM_CONSTRAINTS;
    }

    const supports = MediaServices.getNavigatorMediaDevices().getSupportedConstraints();
    if (!supports.width || !supports.height) {
      console.error(
        'Constraint width or height not supported! fallback to default resolution'
      );
      return MINIMUM_CONSTRAINTS;
    }

    // If is valid idealCameraDevice
    if (idealCameraDevice) {
      const isFacingMode = SUPPORTED_FACING_MODES.includes(idealCameraDevice);
      if (isFacingMode) {
        idealConstraints.video.facingMode = idealCameraDevice;
      } else {
        // The idealCameraDevice is a deviceId
        idealConstraints.video.deviceId = { exact: idealCameraDevice };
      }
    }

    if (idealResolution && idealResolution.width) {
      idealConstraints.video.width = idealResolution.width;
    }

    if (idealResolution && idealResolution.height) {
      idealConstraints.video.height = idealResolution.height;
    }

    return idealConstraints;
  }

  static _getMaxResolutionConstraintsIphoneOrIpad (idealCameraDevice = '', numberOfMaxResolutionTry) {
    // inspiration : https://www.w3.org/TR/mediacapture-streams/#example-3
    let idealResolution = {
      width: { min: 640, ideal: 3840 },
      height: { min: 480, ideal: 2160 }
    };

    let constraints = MediaServices.getIdealConstraints(idealCameraDevice, idealResolution);

    return constraints;
  }

  static getMaxResolutionConstraints (idealCameraDevice = '', numberOfMaxResolutionTry) {
    console.warn('numberOfMaxResolutionTry', numberOfMaxResolutionTry);

    let constraints = MediaServices.getIdealConstraints(idealCameraDevice);

    const VIDEO_ADVANCED_CONSTRANTS = [
      { width: { min: 640 } },
      { width: { min: 800 } },
      { width: { min: 900 } },
      { width: { min: 1024 } },
      { width: { min: 1080 } },
      { width: { min: 1280 } },
      { width: { min: 1920 } },
      { width: { min: 2560 } },
      { width: { min: 3840 } }
    ];

    if (numberOfMaxResolutionTry === 0) {
      if (isIphoneOrIpad()) {
        console.warn('fallback to iPad/iPhone constraints');
        return MediaServices._getMaxResolutionConstraintsIphoneOrIpad(idealCameraDevice, numberOfMaxResolutionTry);
      }
      constraints.video.advanced = VIDEO_ADVANCED_CONSTRANTS;
      return constraints;
    }

    if (numberOfMaxResolutionTry < VIDEO_ADVANCED_CONSTRANTS.length) {
      // Each number of try, we remove the last value of the array (the bigger minim width)
      let advanced = VIDEO_ADVANCED_CONSTRANTS.slice(0, -numberOfMaxResolutionTry);
      constraints.video.advanced = advanced;
      return constraints;
    }

    // Fallback all the possibility has been tried. ie:.
    // numberOfMaxResolutionTry >= VIDEO_ADVANCED_CONSTRANTS.length
    return null;
  }

  static get FACING_MODES () {
    return FACING_MODES;
  }

  static get IMAGE_TYPES () {
    return IMAGE_TYPES;
  }
}
