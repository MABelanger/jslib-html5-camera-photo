import CameraPhoto from '../lib';
import './styles.css';

function stopCamera (e) {
  console.log('stopCamera');
  cameraPhoto.stopDevice();
}

function startDefaultCamera (e) {
  console.log('startDefaultCamera');
  cameraPhoto.startDevice();
}

function startEnvironmentCamera (e) {
  console.log('startEnvironmentCamera');
  let idealFacingMode = cameraPhoto.FACING_MODES.ENVIRONMENT;
  cameraPhoto.startDevice(idealFacingMode);
}

function startUserCamera (e) {
  console.log('startUserCamera');
  let idealFacingMode = cameraPhoto.FACING_MODES.USER;
  cameraPhoto.startDevice(idealFacingMode);
}

document.getElementById('stopCameraButtonId').onclick = stopCamera;
document.getElementById('startDefaultCameraButtonId').onclick = startDefaultCamera;
document.getElementById('startEnvironmentCameraButtonId').onclick = startEnvironmentCamera;
document.getElementById('startUserCameraButtonId').onclick = startUserCamera;

let videoElement = document.getElementById('videoId');
let cameraPhoto = new CameraPhoto(videoElement);

cameraPhoto.startDevice();
