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

  static checkUserIndex(req, res, next) {
    const index = users.findIndex(user => user.id === Number(req.body.userId));
    if (index === -1) {
      return res.status(404).send({ error: 'User not found' });
    }
    return next();
  }

  static addDiaryMiddleware(req, res, next) {
    if (req.body.type.toLowerCase() === 'private' || req.body.type.toLowerCase() === 'public') {
      return next();
    }
    return res.status(400).send({ error: 'type must be either private or public' });
  }
}
