type FACING_MODE_USER = 'user'
type FACING_MODE_ENVIRONMENT = 'environment'

type FacingMode = FACING_MODE_USER | FACING_MODE_ENVIRONMENT

type IMAGE_TYPE_PNG = 'png'
type IMAGE_TYPE_JPG = 'jpg'

type ImageType = IMAGE_TYPE_JPG | IMAGE_TYPE_PNG

interface UserConfig {
  sizeFactor?: number
  imageType?: ImageType
  imageCompression?: number
  isImageMirror?: boolean
}

interface Resolution {
  width: number
  height: number
}

interface CameraSettings {
  aspectRatio: number
  frameRate: number
  height: number
  width: number
}

export default class CameraPhoto {
  constructor(videoElement: HTMLVideoElement) {}
  getCameraSettings(): CameraSettings
  startCamera(
    idealFacingMode?: FacingMode,
    idealResolution?: Resolution
  ): Promise<MediaStream>
  startCameraMaxResolution(idealFacingMode?: FacingMode): Promise<MediaStream>
  getDataUri(userConfig: UserConfig): string
  stopCamera(): Promise<void>
}

export const FACING_MODES: {
  USER: FACING_MODE_USER
  ENVIRONMENT: FACING_MODE_ENVIRONMENT
}
export const IMAGE_TYPES: {
  PNG: IMAGE_TYPE_PNG
  JPG: IMAGE_TYPE_JPG
}
