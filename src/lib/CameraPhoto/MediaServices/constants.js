// camera constants
const USER = 'user';
const ENVIRONMENT = 'environment';

export const SUPPORTED_FACING_MODES = [USER, ENVIRONMENT];

export const FACING_MODES = {
  'USER': USER,
  'ENVIRONMENT': ENVIRONMENT
};

// Image constants
const PNG = 'png';
const JPG = 'jpg';

export const SUPPORTED_IMAGE_TYPES = [JPG, PNG];

export const IMAGE_TYPES = {
  'PNG': PNG,
  'JPG': JPG
};

export const FORMAT_TYPES = {
  [JPG]: 'image/jpeg',
  [PNG]: 'image/png'
};

export const MINIMUM_CONSTRAINTS = {
  audio: false,
  video: true
};
