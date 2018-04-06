import React from 'react';
import CameraPhoto from '../lib';
import './styles.css';

class AppReact extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
  }

  componentDidMount () {
    // We need to instantiate CameraPhoto inside componentDidMount because we
    // need the refs.video to get the videoElement.
    this.cameraPhoto = new CameraPhoto(this.refs.video);
  }

  startCamera (idealFacingMode, idealResolution) {
    this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }

  getDataUri (sizeFactor) {
    return this.cameraPhoto.getDataUri(sizeFactor);
  }

  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }

  render () {
    return (
      <div>
        <button onClick={ () => {
          let facingMode = this.cameraPhoto.FACING_MODES.ENVIRONMENT;
          let idealResolution = { width: 640, height: 480 };
          this.startCamera(facingMode, idealResolution);
        }}> Start environment facingMode resolution ideal 640x480 </button>

        <button onClick={ () => {
          let facingMode = this.cameraPhoto.FACING_MODES.USER;
          this.startCamera(facingMode, {});
        }}> Start user facingMode resolution default </button>

        <button onClick={ () => {
          this.stopCamera();
        }}> Stop </button>

        <video
          ref="video"
          autoPlay="true"
        />
      </div>
    );
  }
}

export default AppReact;
