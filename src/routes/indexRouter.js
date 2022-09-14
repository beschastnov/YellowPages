import express from 'express';
import authCheck from '../middlewares/authCheck';
import { Number } from '../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const allNumbers = await Number.findAll({ order: [['company', 'DESC']] });
  res.render('Layout', { allNumbers });
});

router.get('/registration', async (req, res) => {
  res.render('Layout');
});

router.get('/authorization', async (req, res) => {
  res.render('Layout');
});

router.get('/mynumbers', authCheck, async (req, res) => {
  res.render('Layout');
});

router.get('/add', authCheck, async (req, res) => {
  res.render('Layout');
});

export default router;
