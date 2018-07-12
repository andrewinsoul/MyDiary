import users from '../models/user';

export default class appMiddleware {
  static addUserMiddleware(req, res, next) {
    if (req.body.password1 !== req.body.password2) {
      return res.status(409).send({ error: 'password mismatch' });
    }
    const email = users.find(item => item.email === req.body.email);
    const username = users.find(item => item.username === req.body.username);
    if (email) return res.status(409).send({ error: 'user with this mail already has an account' });
    if (username) return res.status(409).send({ error: 'username already taken, choose another one' });
    return next();
  }
}
