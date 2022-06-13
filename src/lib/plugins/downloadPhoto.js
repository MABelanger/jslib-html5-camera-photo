import { IMAGE_TYPES } from '../CameraPhoto';

function _dataURItoBlob (dataURI) {
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  let blob = new Blob([ab], { type: mimeString });
  return blob;
}

function _padWithZeroNumber (number, width) {
  number = number + '';
  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join('0') + number;
}

function _getFileExtention (blobType) {
  // by default the extention is .png
  let extention = IMAGE_TYPES.PNG;

  if (blobType === 'image/jpeg') {
    extention = IMAGE_TYPES.JPG;
  }
  return extention;
}

function _getFileName (prefixName, imageNumber, blobType) {
  const photoNumber = _padWithZeroNumber(imageNumber, 4);
  const extention = _getFileExtention(blobType);

  return `${prefixName}-${photoNumber}.${extention}`;
}

function _downloadImageFileFomBlob (blob, prefixName, imageNumber) {
  window.URL = window.webkitURL || window.URL;

  let anchor = document.createElement('a');
  anchor.download = _getFileName(prefixName, imageNumber, blob.type);
  anchor.href = window.URL.createObjectURL(blob);
  let mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(mouseEvent);
}

export function downloadPhoto (dataUri, prefixName = 'photo', imageNumber = 0) {
  let blob = _dataURItoBlob(dataUri);
  _downloadImageFileFomBlob(blob, prefixName, imageNumber);
}
