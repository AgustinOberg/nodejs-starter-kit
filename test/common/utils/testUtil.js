/* eslint-disable no-param-reassign */
import chai from 'chai';

const { assert } = chai;

export const assertHasFieldErrors = (err, field) => {
  const emailErrors = err.response.data.errors.filter((e) => e.param === field);
  assert.isNotEmpty(emailErrors);
};

export const assertHasErrorMessage = (err, message) => {
  const emailErrors = err.response.data.errors.map((e) => e.msg);
  assert.isTrue(emailErrors.includes(message));
};

export const assertHasErrorMessageOnce = (err, message) => {
  const error = { response: { data: { errors: [{ msg: message }] } } };
  assertHasErrorMessage(error, message);
};

export const parseJsonObject = (o) => JSON.parse(JSON.stringify(o));

// TODO: Use http util
export const buildAuthorizationHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const multipartFormDataHeader = () => ({
  headers: { 'Content-Type': 'multipart/form-data' },
});

export default {
  assertHasFieldErrors,
  assertHasErrorMessage,
  parseJsonObject,
  buildAuthorizationHeader,
  multipartFormDataHeader,
  assertHasErrorMessageOnce,
};
