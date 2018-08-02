import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import client from '../config/config';

dotenv.load();
const key = process.env.jwtKEY;

class UserHandler {
  createUser(req, res) {
    const encodedPassword = bcrypt.hashSync(req.body.password, 8);
    const { name, email, username } = req.body;
    client.query(
      'INSERT INTO users(Name, Username, Password, Email) values($1, $2, $3, $4)', [name, username, encodedPassword, email],
    ).then(
      () => {
        const token = jwt.sign(
          {
            id: email,
          },
          key,
          {
            expiresIn: 86400,
          },
        );
        return res.status(201).send({ auth: true, token });
      },
    )
      .catch(error => res.status(409).send({ error }));
  }

  loginUser(req, res) {
    const message = 'login successful';
    const { email, password } = req.body;
    client.query(
      'SELECT email, password FROM users WHERE email=($1) LIMIT 1', [email],
    ).then((result) => {
      if (result.rowCount === 0) return res.status(404).send({ auth: false, token: null, error: 'User with mail not found.' });
      const isPasswordValid = bcrypt.compareSync(password, result.rows[0].password);
      if (!isPasswordValid) return res.status(401).send({ auth: false, token: null, error: 'incorrect password' });
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
    })
      .catch(error => res.status(500).send({ error }));
  }
}
export default new UserHandler();
