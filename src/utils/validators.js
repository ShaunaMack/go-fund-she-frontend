export const VALID = null;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 30;

const isNonEmptyString = (val) =>
  typeof val === "string" && val.trim().length > 0;

export const required = (message) => (value) =>
  value && isNonEmptyString(value) ? VALID : message;

export const minLength = (message, minimumLength) => (value) =>
  value && value.length >= minimumLength ? VALID : message;

export const maxLength = (message, maximumLength) => (value) =>
  value && value.length <= maximumLength ? VALID : message;

// regex for expected email format
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const emailFormatValid = (message) => (value) =>
  value && EMAIL_RE.test(value) ? VALID : message;

export const positiveInteger = (message) => (value) => {
  const numberValue = Number(value);
  return numberValue > 0 && Number.isInteger(numberValue) ? VALID : message;
};

// regex for expected url format
const URL_RE = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

export const urlValid = (message) => (value) =>
  value && URL_RE.test(value) ? VALID : message;
