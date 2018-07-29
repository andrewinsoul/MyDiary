import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import client from '../config/config';

dotenv.load();
const key = process.env.jwtKEY;

const userHandler = {
  createUser(req, res) {
    const encodedPassword = bcrypt.hashSync(req.body.password, 8);
    const userInfo = {
      name: req.body.name,
      email: req.body.email,
      password: encodedPassword,
      username: req.body.username,
    };
    client.query(
      'INSERT INTO users(Name, Username, Password, Email) values($1, $2, $3, $4)', [userInfo.name, userInfo.username, userInfo.password, userInfo.email],
    ).then(
      () => {
        const token = jwt.sign(
          {
            id: userInfo.email,
          },
          key,
          {
            expiresIn: 86400,
          },
        );
        return res.status(201).send({ auth: true, token });
      },
    )
      .catch(error => res.status(409).send({ error: error.detail }));
  },

  loginUser(req, res) {
    const message = 'login successful';
    const userInput = {
      email: req.body.email,
      password: req.body.password,
    };
    client.query(
      'SELECT email, password FROM users WHERE email=($1) LIMIT 1', [userInput.email],
    ).then((result) => {
      if (result.rowCount === 0) return res.status(404).send({ auth: false, token: null, error: 'User with mail not found.' });
      const isPasswordValid = bcrypt.compareSync(req.body.password, result.rows[0].password);
      if (!isPasswordValid) return res.status(401).send({ auth: false, token: null, msg: 'incorrect password' });
      const token = jwt.sign(
        {
          id: result.rows[0].email,
        },
        key,
        {
          expiresIn: 86400,
        },
      );
      return res.status(200).send({ auth: true, token, message });
    });
  },
};
export default userHandler;
