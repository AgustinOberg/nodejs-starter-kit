export const isString = (str) =>
  typeof str === 'string' || str instanceof String;

export const isNumeric = (n) => !Number.isNaN(n) && Number.isFinite(n);

export const isBoolean = (val) =>
  val === false || val === true || typeof val === 'boolean';

export const isObject = (o) => typeof o === 'object' && o !== null;

export const isTrue = (str) => str === 'true';

export default { isString, isNumeric, isBoolean, isObject, isTrue };
