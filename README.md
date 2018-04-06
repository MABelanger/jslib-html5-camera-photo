# jslib-html5-camera-photo

The first objective of this package comes from the need to have a js library that can help me to capture picture from mobile or desktop camera through the browser with the HTML5 video and canvas elements.

Another js camera ? Yes! I found [webcamjs](https://github.com/jhuckaby/webcamjs/) and [jpeg_camera](https://github.com/amw/jpeg_camera) but i need to switch easily from camera `environment` and `user`. You need to build the constraint of getUserMedia()... Another need is to have a `sizeFactor` instead of a fixing 'width' and 'height' that can not fit with the ratio of the resolution that camera can pick.

I tried to figure it out how to get the maximum of camera resolution. Not an easy solution, i found that the `**video.optional:[{minWidth: 640}, ...]**` is obsolete so i use instead the new `**video.advanced:[{'width': {'min': 640}}, ...]**` constraint to get the maximum resolution. I had problem with some mobile browser so when we use the maximum resolution and the camera won't start it get error of `trackStartError` because the resolution is to hight ? So it fall back to default resolution by trying multiples `minimum width` until they is no more `video.advanced[...]` array. If you have better solution please contribute :)

## Features of the library.
1. Choose between environment or user camera, fall back to the default camera.
2. Set preferred resolution, fall back to the default resolution.
3. Try to get the maximum resolution of the camera, fall back to the default resolution.


## supported browsers (getUserMedia)
[https://caniuse.com/#search=getUserMedia](https://caniuse.com/#search=getUserMedia)
![alt caniuse](./docs/caniuse.png)
..(April 2018)


## Available camera facingModes

VideoFacingModeEnum  | Description
--- | ---
user | The source is facing toward the user (a self-view camera).
environment	| The source is facing away from the user (viewing the environment).
left | The source is facing to the left of the user. ***
right | The source is facing to the right of the user. ***

*** : Not supported by this lib.

#### Below is an illustration of the video facing modes in relation to the user.

![alt facingModes](./docs/camera-names-exp.svg)

src : [https://www.w3.org/TR/mediacapture-streams/#dom-videofacingmodeenum](https://www.w3.org/TR/mediacapture-streams/#dom-videofacingmodeenum)

## LiveDemo
[https://mabelanger.github.io/jslib-html5-camera-photo/](https://mabelanger.github.io/jslib-html5-camera-photo/)

## Installation

```bash
npm install --save jslib-html5-camera-photo
```

```bash
yarn add jslib-html5-camera-photo
```

Both Yarn and npm download packages from the npm registry.

## API

### Geting started
You can use it with pure JavaScript, Jquery or React.

### Example vanilla Js with HTML

#### HTML
```html
<!-- needed to by the camera stream -->
<video id="videoId" autoplay="true"></video>

<!-- needed if you want to display the image when you take a photo -->
<img alt="imgId" id="imgId">

<!--buttons to trigger the actions -->
<button id="takePhotoButtonId">takePhoto</button>
<button id="stopCameraButtonId">stopCamera</button>
```

#### JavaScript
```js
import CameraPhoto from 'lib-html5-camera-photo';

// get video and image elements from the html
let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

// get buttons elements from the html
let takePhotoButtonElement = document.getElementById('takePhotoButtonId');
let stopCameraButtonElement = document.getElementById('stopCameraButtonId');

// instantiate CameraPhoto with the videoElement
let cameraPhoto = new CameraPhoto(videoElement);

/*
 * Start the camera with preferred environment facingMode
 * if the environment facingMode is not available, it will fallback
 * to the default camera available.
 */
cameraPhoto.startCamera(cameraPhoto.FACING_MODES.ENVIRONMENT)
  .then(() => {
    console.log('Camera started !');
  })
  .catch((error) => {
    console.error('Camera not started!', error);
  });

// function called by the buttons.
function takePhoto () {
  let dataUri = cameraPhoto.getDataUri();
  imgElement.src = dataUri;
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

// bind the buttons to the right functions.
takePhotoButtonElement.onclick = takePhoto;
stopCameraButtonElement.onclick = stopCamera;

```

### With React
