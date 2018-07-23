import user from '../models/user';

export default class userHandler {
  static addUser(req, res) {
    const userInfo = {
      id: user.length += 1,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password1,
      email: req.body.email,
    };
    user.push(userInfo);
    user.splice(user.length - 2, 1);
    // i include the line above because I get a null value before the last item of an array
    return res.status(201).send({ message: userInfo });
  }

  static loginUser(req, res) {
    const userIndex = user.findIndex(
      info => info.email === req.body.email && info.password === req.body.password,
    );
    if (userIndex === -1) return res.status(401).send({ error: 'incorrect credentials supplied' });
    return res.status(200).send({ message: `signed in as ${user[userIndex].username}` });
  }
}
