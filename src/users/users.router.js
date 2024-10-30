import express from 'express'
import { fetchAll } from './users.controller';

const router = express.Router();

router.get('/', fetchAll);

export default router;