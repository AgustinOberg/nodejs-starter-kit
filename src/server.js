import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/common/errorHandler';
import apiRouter from './router';
const server = express();

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

module.exports = server;
export default server;
