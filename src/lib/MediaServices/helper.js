import {
  SUPPORTED_IMAGE_TYPES,
  FORMAT_TYPES,
  PNG,
  JPG
} from './constants';

function _validateImgParam (imageType, compression) {
  // validate the compression
  if (!(compression >= 0 && compression <= 1)) {
    throw new Error(compression + ' is invalid compression, choose between: [0, 1]');
  }

  // validate the imageType
  if (!SUPPORTED_IMAGE_TYPES.includes(imageType)) {
    throw new Error(imageType + ' is invalid imageType, choose between: ' + SUPPORTED_IMAGE_TYPES.join(', '));
  }
  return true;
}

function _getValidImgParam (imageType, compression) {
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

export function getDataUri (canvas, imageType, compression) {
  const imgParam = _getValidImgParam(imageType, compression);

  if (imgParam.imageType === JPG) {
    return canvas.toDataURL(FORMAT_TYPES[JPG], compression);
  }

  return canvas.toDataURL(FORMAT_TYPES[imageType]);
}
