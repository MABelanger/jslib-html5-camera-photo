import CameraPhoto from '../lib';
import './styles.css';

function stopCamera (e) {
  cameraPhoto.stopCamera()
    .then(() => {
      console.log('Camera stoped!');
    })
    .catch((error) => {
      console.log('No camera to stop!:', error);
    });
}

function _startCamera (idealFacingMode) {
  cameraPhoto.startCamera(idealFacingMode)
    .then(() => {
      console.log('Camera started !');
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

function startDefaultCamera (e) {
  console.log('startDefaultCamera');
  _startCamera();
}

function startEnvironmentCamera (e) {
  console.log('startEnvironmentCamera');
  _startCamera(cameraPhoto.FACING_MODES.ENVIRONMENT);
}

function startUserCamera (e) {
  console.log('startUserCamera');
  _startCamera(cameraPhoto.FACING_MODES.USER);
}

function takePhoto () {
  let dataUri = cameraPhoto.getDataUri();
  imgElement.src = dataUri;
}

document.getElementById('stopCameraButtonId').onclick = stopCamera;
document.getElementById('startDefaultCameraButtonId').onclick = startDefaultCamera;
document.getElementById('startEnvironmentCameraButtonId').onclick = startEnvironmentCamera;
document.getElementById('startUserCameraButtonId').onclick = startUserCamera;
document.getElementById('takePhotoButtonId').onclick = takePhoto;

let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

let cameraPhoto = new CameraPhoto(videoElement);

cameraPhoto.startCamera();
