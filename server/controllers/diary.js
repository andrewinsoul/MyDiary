import client from '../config/config';

const diaryHandler = {
  createDiary(req, res) {
    const diaryInfo = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.desc,
      userId: req.body.userId,
    };
    client.query(
      'INSERT INTO diaries(Name, Description, diarytype, userId) values($1, $2, $3, $4) RETURNING *', [diaryInfo.name, diaryInfo.description, diaryInfo.type, diaryInfo.userId],
    ).then(
      result => res.status(201).send({ message: result.rows }),
    )
      .catch(error => res.status(500).send({ error }));
  },
};
export default diaryHandler;
