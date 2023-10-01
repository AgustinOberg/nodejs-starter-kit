import axios from 'axios';
import chai from 'chai';
import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import mocha from 'mocha';
import '../../app';
import endpoints from '../common/endpoints';

const { describe, it } = mocha;
const { assert } = chai;
const { CHECK } = endpoints;
const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('Status Controller', () => {
  describe(`POST ${CHECK}`, () => {
    it('should return a OK (200) status code', async () => {
      const response = await instance.post(CHECK, {
        from: faker.name.findName(),
      });
      assert.equal(response.status, StatusCodes.OK);
    });
  });
});
