import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const key = process.env.jwtKEY;
export default class appMiddleware {
  static addUserMiddleware(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(409).send({ error: 'password mismatch' });
    }
    return next();
  }

  static addDiaryMiddleware(req, res, next) {
    if (req.body.type.toLowerCase() === 'private' || req.body.type.toLowerCase() === 'public') return next();
    return res.status(400).send({ error: 'type must be either private or public' });
  }

  static verifyToken(req, res, next) {
    const myToken = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!myToken) return res.status(403).send({ auth: false, msg: 'No token provided' });
    jwt.verify(
      myToken,
      key, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, msg: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
      },
    );
  }
}
