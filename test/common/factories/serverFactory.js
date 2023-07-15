import faker from 'faker';
import Server from '../../../src/models/server';

export const generateServerData = (data) => ({
  ...{
    name: faker.name.findName(),
    active: true,
  },
  ...data,
});

export const generateServer = (data) => Server.create(generateServerData(data));
