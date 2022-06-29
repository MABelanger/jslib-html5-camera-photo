# Change Log

### Bug Fixes & add features

#### 3.3.4
- Fix detect ios, (new iPad)

#### 3.3.3
- Fix stick on max resolution

#### 3.3.2
- Fix bug startCameraMaxResolution() without choosing camera.

#### 3.3.0
- \#73 Remove list of cameras to the startCamera() and startCameraMaxResolution() and return only resolve(stream).
- Remove getInputVideoDeviceInfos(), use enumerateCameras() instead.

#### 3.2.0
- \#73 Add list of cameras to the startCamera() and startCameraMaxResolution() and return promise with parameters resolve(stream, cameras).
- enumerateCameras() return promises of resolve (cameras).
- getInputVideoDeviceInfos() is now depreciated, use enumerateCameras() instead.

#### 3.1.11
- \#25 Fix max resolution not working ios.

#### 3.1.10
- Add plugin downloadPhoto and fix README.md

#### 3.1.9
- \#35 Add support for selecting a camera by deviceId

#### 3.1.7
- \#47 Add polyfilled version of navigator.mediaDevices

#### 3.1.4
- \#29 Add getInputVideoDeviceInfos() method

#### 3.1.2
- \#9 fix startCameraMaxResolution console error when permission denied

#### 3.1.1
- Fix this.stream.getTracks(...)[0].getSettings is not a function for old browser

#### 3.1.0-beta.0
- Add umd suport bowser, can be used with <script> tag (npm run buildBrowser)

#### 3.0.2-beta.0
- Fix Invalid constraint on safari when default value is used.
