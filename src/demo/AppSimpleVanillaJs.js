import CameraPhoto, { FACING_MODES, IMAGE_TYPES, downloadPhoto, _getDebugPlatformInfo } from '../lib';
import './styles.css';

// get video and image elements
let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

// get select and buttons elements
let facingModeSelectElement = document.getElementById('facingModeSelectId');
let startCameraDefaultAllButtonElement = document.getElementById(
  'startDefaultAllButtonId'
);
let startDefaultResolutionButtonElement = document.getElementById(
  'startDefaultResolutionButtonId'
);
let startMaxResolutionButtonElement = document.getElementById(
  'startMaxResolutionId'
);
let takePhotoButtonElement = document.getElementById('takePhotoButtonId');
let takePhotoAndDownloadButtonElement = document.getElementById('takePhotoAndDownloadButtonId');
let stopCameraButtonElement = document.getElementById('stopCameraButtonId');
let cameraSettingElement = document.getElementById('cameraSettingsId');
let showSwitchCamerasButtonsElement = document.getElementById(
  'showSwitchCameraButtonsId'
);
let showDebugPlatformInfoButtonElement = document.getElementById(
  'showDebugPlatformInfoButtonId'
);

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

function takePhotoAndDownload () {
  let sizeFactor = 1;
  let imageType = IMAGE_TYPES.JPG;
  let imageCompression = 1;

  let config = {
    sizeFactor,
    imageType,
    imageCompression
  };

  let dataUri = cameraPhoto.getDataUri(config);
  downloadPhoto(dataUri, 'myPhoto', 1);
  imgElement.src = dataUri;
}

function showCameraSettings () {
  let settings = cameraPhoto.getCameraSettings();

  // by default is no camera...
  let innerHTML = 'No active camera';
  if (settings) {
    let { aspectRatio, frameRate, height, width } = settings;
    innerHTML = `
        <b>Current active camera:</b>
        aspectRatio:${aspectRatio}
        frameRate: ${frameRate}
        height: ${height}
        width: ${width}
    `;
  }
  cameraSettingElement.innerHTML = innerHTML;
}

function showSwitchCameraButtons () {
  cameraPhoto.enumerateCameras().then((cameras) => {
    if (cameras && cameras.length > 0) {
      let cameraButtonsContainer = document.getElementById('cameraButtonsContainerId');
      cameraButtonsContainer.innerHTML = '';

      let h3Element = document.createElement('h3');
      h3Element.innerText = 'Choose your camera :';
      cameraButtonsContainer.appendChild(h3Element);

      cameras.forEach((camera) => {
        let { kind, label, deviceId } = camera;
        const buttonElement = document.createElement('button');
        buttonElement.innerHTML = `
            kind: ${kind} <br/>
            label: ${label} <br/>
            deviceId: ${deviceId}
          `;
        (function (deviceId) {
          buttonElement.addEventListener('click', function () {
            console.log('click on', deviceId);
            startCameraIdMaxResolution(deviceId);
          });
        })(deviceId);
        cameraButtonsContainer.appendChild(buttonElement);
      });
    }
  }).catch((error) => {
    console.log('Error could not enumerateCameras:', error);
  });
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

function startCameraIdMaxResolution (deviceId) {
  cameraPhoto.startCameraMaxResolution(deviceId)
    .then(() => {
      let log =
        `Camera started with maximum resoluton and ` +
        `prefered deviceId: ${deviceId} `;
      console.log(log);
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

function startCameraMaxResolution () {
  let facingMode = facingModeSelectElement.value;
  cameraPhoto.startCameraMaxResolution(FACING_MODES[facingMode])
    .then(() => {
      let log =
        `Camera started with maximum resoluton and ` +
        `prefered facingMode: ${facingMode} `;
      console.log(log);
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

function showDebugPlatformInfo () {
  let debugPlatformInfoElement = document.getElementById('debugPlatformInfoId');
  debugPlatformInfoElement.innerHTML = JSON.stringify(_getDebugPlatformInfo(), null, 2);
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
  takePhotoAndDownloadButtonElement.onclick = takePhotoAndDownload;
  stopCameraButtonElement.onclick = stopCamera;
  showSwitchCamerasButtonsElement.onclick = showSwitchCameraButtons;
  showDebugPlatformInfoButtonElement.onclick = showDebugPlatformInfo;
});
