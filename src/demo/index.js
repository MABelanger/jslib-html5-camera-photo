import CameraPhoto from '../lib';
import './styles.css';

function stopCamera (e) {
  console.log('stopCamera');
  cameraPhoto.stopCamera();
}

function startDefaultCamera (e) {
  console.log('startDefaultCamera');
  cameraPhoto.startCamera();
}

function startEnvironmentCamera (e) {
  console.log('startEnvironmentCamera');
  let idealFacingMode = cameraPhoto.FACING_MODES.ENVIRONMENT;
  cameraPhoto.startCamera(idealFacingMode);
}

function startUserCamera (e) {
  console.log('startUserCamera');
  let idealFacingMode = cameraPhoto.FACING_MODES.USER;
  cameraPhoto.startCamera(idealFacingMode);
}

function takePhotoCamera () {
  let dataUri = cameraPhoto.getDataUri();
  imgElement.src = dataUri;
}

document.getElementById('stopCameraButtonId').onclick = stopCamera;
document.getElementById('startDefaultCameraButtonId').onclick = startDefaultCamera;
document.getElementById('startEnvironmentCameraButtonId').onclick = startEnvironmentCamera;
document.getElementById('startUserCameraButtonId').onclick = startUserCamera;
document.getElementById('takePhotoCameraButtonId').onclick = takePhotoCamera;

let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

let cameraPhoto = new CameraPhoto(videoElement);

cameraPhoto.startCamera();
