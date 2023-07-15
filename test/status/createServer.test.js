import chai from 'chai';
import mocha from 'mocha';
import '../../app';
import endpoints from '../common/endpoints';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { generateServerData } from '../common/factories/serverFactory';
import { assertHasErrorMessage } from '../common/utils/testUtil';
import errorCodes from '../../src/constants/errorCodes';
import faker from 'faker';
import Server, {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '../../src/models/server';

const { describe, it, after } = mocha;
const { assert } = chai;
const { DB_SERVER } = endpoints;
const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

const clearDB = async () => {
  await Server.deleteMany({});
};

describe('Status Controller', () => {
  describe(`POST ${DB_SERVER}`, () => {
    it('should fail if the name is not provided', async () => {
      const body = generateServerData({ name: undefined });
      try {
        await instance.post(DB_SERVER, body);
      } catch (error) {
        assert.equal(error.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assertHasErrorMessage(error, errorCodes.SERVER_NAME_NOT_FOUND);
      }
    });
    it('should fail if the name is too short', async () => {
      const body = generateServerData({
        name: faker.random.alphaNumeric(NAME_MIN_LENGTH - 1),
      });
      try {
        await instance.post(DB_SERVER, body);
      } catch (error) {
        assert.equal(error.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assertHasErrorMessage(error, errorCodes.SERVER_NAME_TOO_SHORT);
      }
    });
    it('should fail if the name is too long', async () => {
      const body = generateServerData({
        name: faker.random.alphaNumeric(NAME_MAX_LENGTH + 1),
      });
      try {
        await instance.post(DB_SERVER, body);
      } catch (error) {
        assert.equal(error.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assertHasErrorMessage(error, errorCodes.SERVER_NAME_TOO_LONG);
      }
    });
    it('should return a CREATED (201) status code', async () => {
      const body = generateServerData();
      const response = await instance.post(DB_SERVER, body);
      assert.equal(response.status, StatusCodes.CREATED);
      assert.isNotEmpty(response.data._id);
      assert.equal(response.data.name, body.name);
      assert.equal(response.data.active, body.active);
    });
  });
  after(async () => {
    await clearDB();
  });
});
