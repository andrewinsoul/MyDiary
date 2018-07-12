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
    // i include the line above because I get a null value before the last item of an array
    return res.status(200).send({ msg: userInfo });
  }

  static loginUser(req, res) {
    // const email = user.find(userInfo => userInfo.email === req.body.email);
    // const password = user.find(userInfo => userInfo.password === req.body.password);
    const userIndex = user.findIndex(
      userInfo => userInfo.email === req.body.email && userInfo.password === req.body.password,
    );
    // if (!email) return res.status(401).send({ error: 'the email you entered is incorrect ' });
    // if (!password) return res.status(401).send({ error: 'the password you entered is incorrect ' });
    if (userIndex === -1) return res.status(401).send({ error: 'incorrect credentials supplied' });
    return res.status(200).send({ msg: `signed in as ${user[userIndex].username}` });
  }
}
