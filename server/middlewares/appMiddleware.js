import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const key = process.env.jwtKEY;
class appMiddleware {
  addUserMiddleware(req, res, next) {
    const { name, password, confirmPassword, username } = req.body;
    if (password !== confirmPassword) {
      return res.status(409).send({ error: 'password mismatch' });
    }
    if (!name.replace(/\s/g, '').length) return res.status(400).send({ error: 'space characters are not allowed as a name' });
    if (/\s/.test(username)) return res.status(400).send({ error: 'username cannot contain space characters' });
    return next();
  }

  addDiaryMiddleware(req, res, next) {
    const { name, desc, type } = req.body;
    if (!desc.replace(/\s/g, '').length) return res.status(400).send({ error: 'space alone is not allowed in the description field' });
    if (!name.replace(/\s/g, '').length) return res.status(400).send({ error: 'space alone is not allowed in the name field' });
    if (type.toLowerCase() === 'private' || req.body.type.toLowerCase() === 'public') return next();
    return res.status(400).send({ error: 'type must be either private or public' });
  }

  addEntryMiddleware(req, res, next) {
    const { title, entry } = req.body;
    if (!title.replace(/\s/g, '').length) return res.status(400).send({ error: 'title field cannot be space alone' });
    if (!entry.replace(/\s/g, '').length) return res.status(400).send({ error: 'entry field cannot be space alone' });
    return next();
  }

  verifyToken(req, res, next) {
    const myToken = req.headers['x-access-token'] || req.body.token;
    if (!myToken) return res.status(403).send({ auth: false, msg: 'No token provided' });
    jwt.verify(
      myToken,
      key, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, msg: 'Failed to authenticate token' });
        req.userId = decoded.id;
        return next();
      },
    );
  }
}
export default new appMiddleware();
