import express from 'express';
import morgan from 'morgan';
import { NotFound } from 'http-errors';

import errorHandler from './error-handler';
import headers from './headers';
import planetsRouter from './planets/index';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(headers);

app.use('/planets', planetsRouter);

app.use((req, res, next) => next(new NotFound()));

app.use(errorHandler);

app.listen(3000);
