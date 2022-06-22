import { SUPPORTED_IMAGE_TYPES, FORMAT_TYPES, IMAGE_TYPES } from './constants';

function _validateImgParam (imageType, imageCompression) {
  // validate the imageCompression
  if (!(imageCompression >= 0 && imageCompression <= 1)) {
    throw new Error(
      imageCompression + ' is invalid imageCompression, choose between: [0, 1]'
    );
  }

  // validate the imageType
  if (!SUPPORTED_IMAGE_TYPES.includes(imageType)) {
    throw new Error(
      imageType +
      ' is invalid imageType, choose between: ' +
      SUPPORTED_IMAGE_TYPES.join(', ')
    );
  }
  return true;
}

function _getValidImgParam (imageType, imageCompression) {
  let imgParam = {};
  try {
    _validateImgParam(imageType, imageCompression);
    imgParam.imageType = imageType;
    imgParam.imageCompression = imageCompression;
  } catch (e) {
    console.error(e);
    console.error('default value of ' + IMAGE_TYPES.PNG + ' is used');

    imgParam.imageType = IMAGE_TYPES.PNG;
    imgParam.imageCompression = null;
  }

  return imgParam;
}

function _getStringWithPlatform () {
  // platform will be obsolete and will return empty string
  const platform = window.navigator.platform;
  const userAgent = window.navigator.userAgent;

  return platform || userAgent;
}

function _getHasTouchEvents () {
  return 'ontouchend' in document;
}

export function getImageSize (videoWidth, videoHeight, sizeFactor) {
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

export function getDataUri (canvas, imageType, imageCompression) {
  const imgParam = _getValidImgParam(imageType, imageCompression);

  if (imgParam.imageType === IMAGE_TYPES.JPG) {
    if (!imageCompression) {
      return canvas.toDataURL(FORMAT_TYPES[IMAGE_TYPES.JPG]);
    }
    return canvas.toDataURL(FORMAT_TYPES[IMAGE_TYPES.JPG], imageCompression);
  }

  return canvas.toDataURL(FORMAT_TYPES[imageType]);
}

export function hasConstraints (idealCameraDevice, idealResolution) {
  return idealCameraDevice || idealResolution;
}

// Inspiration: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
export function getIsIOS () {
  const stringWithPlatform = _getStringWithPlatform();

  if (/iPad|iPhone|iPod/.test(stringWithPlatform)) {
    return true;
  }

  // The new iPad return MacIntel as platform and Macintosh as userAgent
  // so the way to differentiate iPad vs mac is by checking if
  // Touch Events exist on the document
  const hasTouchEvents = _getHasTouchEvents();
  if (/Mac/.test(stringWithPlatform) && hasTouchEvents) {
    return true;
  }

  return false;
}

// TODO : return an object with all usefull info of the device for debugging purpose.
export function _getDebugPlatformInfo () {
  return {
    userAgent: window.navigator.userAgent,
    platform: window.navigator.platform,
    _getStringWithPlatform: _getStringWithPlatform(),
    _getHasTouchEvents: _getHasTouchEvents(),
    getIsIOS: getIsIOS()
  };
}
