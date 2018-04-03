import CameraPhoto from '../lib';
import './styles.css';

// let videoElement = document.createElement("video");
// videoElement.style.backgroundColor = "black";
// videoElement.style.minWidth='200px';
// videoElement.style.minHeight='200px';
// let bodyElement = document.getElementById('root')
// bodyElement.appendChild(videoElement);
// videoElement.play();


function stopCamera(e){
  console.log('stopCamera');
  cameraPhoto.stopDevice();
}

function startDefaultCamera(e){
  console.log('startDefaultCamera');
  cameraPhoto.startDevice();
}

function startEnvironmentCamera(e){
  console.log('startEnvironmentCamera');
  let idealFacingMode = cameraPhoto.FACING_MODES.ENVIRONMENT;
  cameraPhoto.startDevice(idealFacingMode);
}

function startUserCamera(e){
  console.log('startUserCamera');
  let idealFacingMode = cameraPhoto.FACING_MODES.USER;
  cameraPhoto.startDevice(idealFacingMode);
}

document.getElementById("stopCameraButtonId").onclick = stopCamera;
document.getElementById("startDefaultCameraButtonId").onclick = startDefaultCamera;
document.getElementById("startEnvironmentCameraButtonId").onclick = startEnvironmentCamera;
document.getElementById("startUserCameraButtonId").onclick = startUserCamera;


let videoElement = document.getElementById('videoId')
let cameraPhoto = new CameraPhoto(videoElement);

cameraPhoto.startDevice();
