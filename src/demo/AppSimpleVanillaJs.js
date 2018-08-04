import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from '../lib';
import './styles.css';

// get video and image elements
let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

// get select and buttons elements
let facingModeSelectElement =
    document.getElementById('facingModeSelectId');
let startCameraDefaultAllButtonElement =
    document.getElementById('startDefaultAllButtonId');
let startDefaultResolutionButtonElement =
    document.getElementById('startDefaultResolutionButtonId');
let startMaxResolutionButtonElement =
    document.getElementById('startMaxResolutionId');
let takePhotoButtonElement =
    document.getElementById('takePhotoButtonId');
let stopCameraButtonElement =
    document.getElementById('stopCameraButtonId');
let cameraSettingElement =
    document.getElementById('cameraSettingsId');

// instantiate CameraPhoto with the videoElement
let cameraPhoto = new CameraPhoto(videoElement);

function startCameraDefaultAll () {
  cameraPhoto.startCamera()
    .then(() => {
      let log = `Camera started with default All`;
      console.log(log);
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

// start the camera with prefered environment facingMode ie. ()
// if the environment facingMode is not avalible, it will fallback
// to the default camera avalible.
function startCameraDefaultResolution () {
  let facingMode = facingModeSelectElement.value;
  cameraPhoto.startCamera(FACING_MODES[facingMode])
    .then(() => {
      let log =
          `Camera started with default resolution and ` +
          `prefered facingMode : ${facingMode}`;
      console.log(log);
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

// function called by the buttons.
function takePhoto () {
  let sizeFactor = 1;
  let imageType = IMAGE_TYPES.JPG;
  let imageCompression = 1;

  let config = {
    sizeFactor,
    imageType,
    imageCompression
  };

  let dataUri = cameraPhoto.getDataUri(config);
  imgElement.src = dataUri;
}

function showCameraSettings () {
  let settings = cameraPhoto.getCameraSettings();

  // by default is no camera...
  let innerHTML = 'No camera';
  if (settings) {
    let {aspectRatio, frameRate, height, width} = settings;
    innerHTML = `
        aspectRatio:${aspectRatio}
        frameRate: ${frameRate}
        height: ${height}
        width: ${width}
    `;
  }
  cameraSettingElement.innerHTML = innerHTML;
}

function stopCamera () {
  cameraPhoto.stopCamera()
    .then(() => {
      console.log('Camera stoped!');
    })
    .catch((error) => {
      console.log('No camera to stop!:', error);
    });
}

function startCameraMaxResolution () {
  let facingMode = facingModeSelectElement.value;
  cameraPhoto.startCameraMaxResolution(FACING_MODES[facingMode])
    .then(() => {
      let log =
          `Camera started with maximum resoluton and ` +
          `prefered facingMode : ${facingMode}`;
      console.log(log);
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  // update camera setting
  setInterval(() => {
    showCameraSettings();
  }, 500);

  // bind the buttons to the right functions.
  startCameraDefaultAllButtonElement.onclick = startCameraDefaultAll;
  startDefaultResolutionButtonElement.onclick = startCameraDefaultResolution;
  startMaxResolutionButtonElement.onclick = startCameraMaxResolution;
  takePhotoButtonElement.onclick = takePhoto;
  stopCameraButtonElement.onclick = stopCamera;
});
