import ServerSchema from '../models/server';

export const findOne = () => ServerSchema.findOne();
export const create = (data) => ServerSchema.create(data);
