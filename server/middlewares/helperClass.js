import users from '../models/user';
import diaries from '../models/diary';
import entries from '../models/entry';

export default class appMiddleware {
  static addUserMiddleware(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
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

  static checkDiaryIndex(req, res, next) {
    const index = diaries.findIndex(diary => diary.id === Number(req.body.diaryId));
    if (index === -1) return res.status(404).send({ error: 'diary not found' });
    return next();
  }

  static checkEntryIndex(req, res, next) {
    const index = entries.findIndex(entry => entry.id === Number(req.params.id));
    if (index === -1) return res.status(404).send({ error: 'entry not found' });
    return next();
  }
}
