import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressOasGenerator from 'express-oas-generator';
import mongoose from 'mongoose';
import pluralize from 'pluralize';
import environments from './constants/environment';
import errorHandler from './middlewares/common/errorHandler';
import apiRouter from './router';
const server = express();

const mongooseModels = mongoose.modelNames();

const { SPEC_OUTPUT_FILE_BEHAVIOR } = expressOasGenerator;
const { PRESERVE, RECREATE } = SPEC_OUTPUT_FILE_BEHAVIOR;

const { TEST, DEVELOPMENT, PRODUCTION } = environments;
const specOutputPathBehaviorOptions = {
  [TEST]: RECREATE,
  [DEVELOPMENT]: PRESERVE,
  [PRODUCTION]: PRESERVE,
};
// eslint-disable-next-line operator-linebreak
const specOutputFileBehavior =
  specOutputPathBehaviorOptions[process.env.NODE_ENV || DEVELOPMENT];

expressOasGenerator.handleResponses(server, {
  specOutputPath: './api_docs.json',
  mongooseModels,
  tags: mongooseModels.map(pluralize.plural).concat(['Server', 'Status']),
  specOutputFileBehavior,
  ignoredNodeEnvironments: [DEVELOPMENT, PRODUCTION],
  alwaysServeDocs: true,
});

server.use(
  cors({
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  })
);

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: false }));
server.use(cookieParser());
server.use('/api', apiRouter);
server.use(errorHandler);

expressOasGenerator.handleRequests();

module.exports = server;
export default server;
