import express from 'express';
import userCheck from '../middlewares/userCheck';
import authCheck from '../middlewares/authCheck';
import { Number } from '../db/models';

const router = express.Router();

router.post('/number', authCheck, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const currNumber = await Number.create({
      company: name,
      phone,
      user_id: req.session.userSession.id,
    });
    res.json(currNumber);
  } catch (e) {
    console.log(e);
  }
});

router.get('/numbers', async (req, res) => {
  const allNumbers = await Number.findAll({ order: [['company', 'DESC']] });
  res.json(allNumbers);
});

router.get('/mynumbers', async (req, res) => {
  const allNumbers = await Number.findAll({ where: { user_id: res.locals.userSession.id }, order: [['company', 'DESC']] });
  res.json(allNumbers);
});

router.delete('/number/:id', userCheck, async (req, res) => {
  const { id } = req.params;
  await Number.destroy({ where: { id } });
  res.sendStatus(200);
});

router.get('/number/:id', async (req, res) => {
  const oneNumber = await Number.findOne({ where: { id: req.params.id } });
  res.json(oneNumber);
});

router.put('/number/:id', async (req, res) => {
  console.log(req.params.id);
  await Number.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

export default router;
