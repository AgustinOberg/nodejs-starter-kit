import axios from 'axios';
import chai from 'chai';
import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import mocha from 'mocha';
import '../../app';
import errorCodes from '../../src/constants/errorCodes';
import endpoints from '../common/endpoints';
import { assertHasErrorMessage } from '../common/utils/testUtil';
const { STATUS_FROM_NOT_EXIST } = errorCodes;
const { describe, it } = mocha;
const { assert } = chai;
const { CHECK } = endpoints;
const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('Status Controller', () => {
  describe(`POST ${CHECK}`, () => {
    it('should return a FAIL (422) status code if from is not provided', async () => {
      try {
        await instance.post(CHECK, {
          from: undefined,
        });
        assert.fail();
      } catch (error) {
        assert.equal(error.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assertHasErrorMessage(error, STATUS_FROM_NOT_EXIST);
      }
    });
    it('should return a OK (200) status code', async () => {
      const response = await instance.post(CHECK, {
        from: faker.name.findName(),
      });
      assert.equal(response.status, StatusCodes.OK);
    });
  });
});
