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
let showInputVideoDeviceInfosButtonElement =
  document.getElementById('showInputVideoDeviceInfosButtonId');
let inputVideoDeviceInfosElement =
    document.getElementById('inputVideoDeviceInfosId');
let rotateInputDeviceElement =
  document.getElementById('rotateInputDeviceId');

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
    let {aspectRatio, deviceId, frameRate, height, width} = settings;
    innerHTML = `
        aspectRatio:${aspectRatio}
        frameRate: ${frameRate}
        height: ${height}
        width: ${width}
        deviceId: ${deviceId}
    `;
  }
  cameraSettingElement.innerHTML = innerHTML;
}

function showInputVideoDeviceInfos () {
  let inputVideoDeviceInfos = cameraPhoto.getInputVideoDeviceInfos();

  // by default is no inputVideoDeviceInfo...
  let innerHTML = 'No inputVideoDeviceInfo';
  if (inputVideoDeviceInfos) {
    innerHTML = '';
    inputVideoDeviceInfos.forEach((inputVideoDeviceInfo) => {
      let {kind, label, deviceId} = inputVideoDeviceInfo;
      let inputVideoDeviceInfoHTML = `
            kind: ${kind}
            label: ${label}
            deviceId: ${deviceId}
            <button class="selectDeviceButton" data-device-id="${deviceId}">switch</button>
            <br/>
        `;
      innerHTML += inputVideoDeviceInfoHTML;
    });
  }
  inputVideoDeviceInfosElement.innerHTML = innerHTML;

  for (const elt of document.querySelectorAll('button.selectDeviceButton')) {
    elt.addEventListener('click', () => {
      cameraPhoto.startCamera(undefined, undefined, elt.dataset.deviceId)
        .then(() => {
          var log = `Camera started with deviceId ${elt.dataset.deviceId}`;
          console.log(log);
        })
        .catch((error) => {
          console.error('Camera not started!', error);
        });
    });
  }
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

function rotateInputDevice () {
  let { deviceId } = cameraPhoto.getCameraSettings();
  if (!deviceId) {
    console.error('Camera not started!');
    return;
  }

  let inputVideoDeviceInfos = cameraPhoto.getInputVideoDeviceInfos();
  if (!inputVideoDeviceInfos) {
    console.error('Video device information not available, or no cameras found');
    return;
  }

  if (inputVideoDeviceInfos.length < 2) {
    console.error('There are no other cameras to select');
    return;
  }

  let currentDeviceOffset = inputVideoDeviceInfos.findIndex((di) => di.deviceId === deviceId);
  let newDeviceOffset = (currentDeviceOffset + 1) % inputVideoDeviceInfos.length;
  let newDeviceId = inputVideoDeviceInfos[newDeviceOffset].deviceId;
  cameraPhoto.startCamera(undefined, undefined, newDeviceId)
    .then(() => {
      var log = `Camera started with deviceId ${newDeviceId}`;
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
  showInputVideoDeviceInfosButtonElement.onclick = showInputVideoDeviceInfos;
  rotateInputDeviceElement.onclick = rotateInputDevice;
});
