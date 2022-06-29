import { getImageSize, getDataUri, hasConstraints, getIsIOS } from './helper';

import {
  SUPPORTED_FACING_MODES,
  FACING_MODES,
  IMAGE_TYPES,
  NO_CONSTRAINTS
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
    if (!hasConstraints(idealCameraDevice, idealResolution)) {
      return NO_CONSTRAINTS;
    }

    const supConstraints = MediaServices.getNavigatorMediaDevices().getSupportedConstraints();
    if (!supConstraints.width || !supConstraints.height) {
      console.error(
        'Constraint width or height not supported! fallback to default resolution'
      );
      return NO_CONSTRAINTS;
    }

    let facingMode;
    let deviceId;

    if (idealCameraDevice) {
      const isFacingMode = SUPPORTED_FACING_MODES.includes(idealCameraDevice);
      if (isFacingMode) {
        facingMode = idealCameraDevice;
      } else {
        deviceId = { exact: idealCameraDevice };
      }
    }

    const width = idealResolution && idealResolution.width;
    const height = idealResolution && idealResolution.height;

    return {
      audio: false,
      video: {
        facingMode,
        deviceId,
        width,
        height
      }
    };
  }

  static getMaxResolutionConstraints (idealCameraDevice = '', numberOfMaxResolutionTry) {
    console.warn('getMaxResolutionConstraints() numberOfMaxResolutionTry:', numberOfMaxResolutionTry);

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

    let stdConstraints = MediaServices.getIdealConstraints(idealCameraDevice, {});

    if (numberOfMaxResolutionTry === 0) {
      if (getIsIOS()) {
        console.warn('fallback to iOS constraints');
        // inspiration : https://www.w3.org/TR/mediacapture-streams/#example-3
        let iPhoneConstraints = MediaServices.getIdealConstraints(idealCameraDevice, {
          width: { min: 640, ideal: 3840 },
          height: { min: 480, ideal: 2160 }
        });
        return iPhoneConstraints;
      }

      stdConstraints.video.advanced = VIDEO_ADVANCED_CONSTRANTS;
      return stdConstraints;
    }

    if (numberOfMaxResolutionTry < VIDEO_ADVANCED_CONSTRANTS.length) {
      // Each number of try, we remove the last value of the array (the bigger minim width)
      let advanced = VIDEO_ADVANCED_CONSTRANTS.slice(0, -numberOfMaxResolutionTry);
      stdConstraints.video.advanced = advanced;
      return stdConstraints;
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
