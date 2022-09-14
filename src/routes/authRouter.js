import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/models';

const router = express.Router();

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
});

router.post('/registration', async (req, res) => {
  const { name, login, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    login,
    pass: hashedPass,
  });
  req.session.userSession = { name: newUser.name, login: newUser.login, id: newUser.id };
  res.json(req.session.userSession).status(200);
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const newUser = await User.findOne({ where: { login } });
  const compare = await bcrypt.compare(password, newUser.pass);
  if (compare) {
    req.session.userSession = { login: newUser.login, name: newUser.name, id: newUser.id };
    res.json(req.session.userSession).status(200);
  } else {
    res.sendStatus(401);
  }
});
export default router;
