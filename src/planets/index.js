import express from 'express';

import { findAll, findOne } from './service';

const router = express.Router();

router
  .get('/', findAll)
  .get('/:id', findOne);

export default router;
