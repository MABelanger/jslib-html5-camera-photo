import CameraPhoto from '../lib';
import './styles.css';

// get video and image elements
let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

// get buttons elements
let facingModeSelectElement =
    document.getElementById('facingModeSelectId');
let startDefaultResolutionButtonElement =
    document.getElementById('startDefaultResolutionButtonId');
let takePhotoButtonElement =
    document.getElementById('takePhotoButtonId');
let stopCameraButtonElement =
    document.getElementById('stopCameraButtonId');
let startMaxResolutionButtonElement =
    document.getElementById('startMaxResolutionId');
let cameraSettingElement =
    document.getElementById('cameraSettingsId');

// instantiate CameraPhoto with the videoElement
let cameraPhoto = new CameraPhoto(videoElement);

// start the camera with prefered environment facingMode ie. ()
// if the environment facingMode is not avalible, it will fallback
// to the default camera avalible.
function startCameraDefaultResolution () {
  let facingMode = facingModeSelectElement.value;
  cameraPhoto.startCamera(cameraPhoto.FACING_MODES[facingMode])
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
  let imageType = cameraPhoto.IMAGE_TYPES.JPG;
  let compression = 1;

  let dataUri = cameraPhoto.getDataUri(sizeFactor, imageType, compression);
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
  cameraPhoto.startCameraMaxResolution(cameraPhoto.FACING_MODES[facingMode])
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
    let cameraSettigs = cameraPhoto.getCameraSettings();
    if (cameraSettigs) {
      let {aspectRatio, frameRate, height, width} = cameraSettigs;
      let settingsStr =
        `aspectRatio:${aspectRatio} ` +
        `frameRate: ${frameRate} ` +
        `height: ${height} ` +
        `width: ${width}`;
      console.log(settingsStr);
    }
  }, 500);

  // bind the buttons to the right functions.
  takePhotoButtonElement.onclick = takePhoto;
  stopCameraButtonElement.onclick = stopCamera;
  startMaxResolutionButtonElement.onclick = startCameraMaxResolution;
  startDefaultResolutionButtonElement.onclick = startCameraDefaultResolution;
});
