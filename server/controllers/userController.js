import user from '../models/user';

export default class userHandler {
  static addUser(req, res) {
    const userInfo = {
      id: user.length += 1,
      name: req.body.name,
      username: req.body.username,
      password1: req.body.password1,
      password2: req.body.password2,
      email: req.body.email,
    };
    user.push(userInfo);
    user.splice(user.length - 2, 1);
    
    return res.status(200).send({ msg: userInfo });
  }
}
