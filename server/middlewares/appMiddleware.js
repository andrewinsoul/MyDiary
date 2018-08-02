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
    if (!name.replace(/\s/g, '').length) return res.status(400).send({ error: 'name field cannot be blank' });
    if (/\s/.test(username)) return res.status(400).send({ error: 'username field cannot be blank' });
    return next();
  }

  addDiaryMiddleware(req, res, next) {
    const { name, desc, type } = req.body;
    if (!desc.replace(/\s/g, '').length) return res.status(400).send({ error: 'description field cannot be blank' });
    if (!name.replace(/\s/g, '').length) return res.status(400).send({ error: 'name field cannot be blank' });
    if (type.toLowerCase() === 'private' || req.body.type.toLowerCase() === 'public') return next();
    return res.status(400).send({ error: 'type must be either private or public' });
  }

  addEntryMiddleware(req, res, next) {
    const { title, entry } = req.body;
    if (!title.replace(/\s/g, '').length) return res.status(400).send({ error: 'title field cannot be blank' });
    if (!entry.replace(/\s/g, '').length) return res.status(400).send({ error: 'entry field cannot be blank' });
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
