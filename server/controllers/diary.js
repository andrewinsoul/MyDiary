import client from '../config/config';

const diaryHandler = {
  createDiary(req, res) {
    const { name, type, desc, userId } = req.body;
    client.query(
      'INSERT INTO diaries(Name, Description, diarytype, userId) values($1, $2, $3, $4) RETURNING *', [name, desc, type, userId],
    ).then(
      result => res.status(201).send({ message: result.rows }),
    )
      .catch(error => res.status(500).send({ error }));
  },
};
export default diaryHandler;
