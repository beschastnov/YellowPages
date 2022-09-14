import { Number } from '../db/models';

async function userCheck(req, res, next) {
  const { id } = req.params;
  const currPost = await Number.findByPk(id);
  if (req.session.userSession.id !== currPost.user_id) return res.sendStatus(401);
  return next();
}
export default userCheck;
