// camera constants
const USER = 'user';
const ENVIRONMENT = 'environment';
const LEFT = 'left';
const RIGHT = 'right';

export const SUPPORTED_FACING_MODES = [USER, ENVIRONMENT, LEFT, RIGHT];

export const FACING_MODES = {
  'USER': USER,
  'ENVIRONMENT': ENVIRONMENT,
  'LEFT': LEFT,
  'RIGHT': RIGHT
};

// Image constants
export const PNG = 'png';
export const JPG = 'jpg';

export const SUPPORTED_IMAGE_TYPES = [JPG, PNG];

export const IMAGE_TYPES = {
  'PNG': PNG,
  'JPG': JPG
};

export const FORMAT_TYPES = {
  [JPG]: 'image/jpeg',
  [PNG]: 'image/png'
};
