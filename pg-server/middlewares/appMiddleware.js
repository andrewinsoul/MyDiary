export default class appMiddleware {
  static addUserMiddleware(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(409).send({ error: 'password mismatch' });
    }
    return next();
  }
}
