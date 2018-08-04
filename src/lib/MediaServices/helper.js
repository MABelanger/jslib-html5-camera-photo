import {
  SUPPORTED_IMAGE_TYPES,
  FORMAT_TYPES,
  IMAGE_TYPES
} from './constants';

function _validateImgParam (imageType, imageCompression) {
  // validate the imageCompression
  if (!(imageCompression >= 0 && imageCompression <= 1)) {
    throw new Error(imageCompression + ' is invalid imageCompression, choose between: [0, 1]');
  }

  // validate the imageType
  if (!SUPPORTED_IMAGE_TYPES.includes(imageType)) {
    throw new Error(imageType + ' is invalid imageType, choose between: ' + SUPPORTED_IMAGE_TYPES.join(', '));
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

function _isEmptyObject (obj) {
  if (typeof obj === 'object') {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
  }

  return true;
}

export function isMinimumConstraints (idealFacingMode, idealResolution) {
  return !(idealFacingMode || (idealResolution && !_isEmptyObject(idealResolution)));
}
