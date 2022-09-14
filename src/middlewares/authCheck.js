function authCheck(req, res, next) {
  if (!req.session?.userSession?.id) return res.sendStatus(401);
  return next();
}
export default authCheck;
