import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import client from '../config/config';

dotenv.load();

const userHandler = {
  createUser(req, res) {
    const encodedPassword = bcrypt.hashSync(req.body.password, 8);
    const userInfo = {
      name: req.body.name,
      email: req.body.email,
      password: encodedPassword,
      username: req.body.username,
    };
    console.log(userInfo.username);
    client.query(
      'INSERT INTO users(Name, Username, Password, Email) values($1, $2, $3, $4)', [userInfo.name, userInfo.username, userInfo.password, userInfo.email],
    ).then(
      () => {
        console.log(userInfo.username);
        const token = jwt.sign(
          {
            id: userInfo.email,
          },
          process.env.jwtKEY,
          {
            expiresIn: 86400,
          },
        );
        return res.status(201).send({ auth: true, token });
      },
    )
      .catch(error => res.status(409).send({ error: error.detail }));
  },
};
export default userHandler;
