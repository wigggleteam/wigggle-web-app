import validator from 'validator';

export const isValidEmail = validator.isEmail;

export const isValidMobile = validator.isMobilePhone;
