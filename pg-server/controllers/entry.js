import client from '../config/config';

const entryHandler = {
  addEntry(req, res) {
    const entryInfo = {
      title: req.body.title,
      entry: req.body.entry,
      diaryId: req.body.diaryId,
    };
    client.query(
      'INSERT INTO entries(Title, Entry, diaryId) values($1, $2, $3) RETURNING *', [entryInfo.title, entryInfo.entry, entryInfo.diaryId],
    ).then(
      result => res.status(201).send({ message: result.rows }),
    )
      .catch(error => res.status(500).send({ error }));
  },

  getAllEntry(req, res) {
    client.query(
      'SELECT * FROM entries',
    ).then(
      result => res.status(200).send({ message: result.rows }),
    )
      .catch(error => res.status(500).send({ error }));
  },

  getAnEntry(req, res) {
    client.query(
      'SELECT * FROM entries WHERE entryId=($1) LIMIT 1', [req.params.entryId],
    ).then((result) => {
      if (!result.rows.length) return res.status(404).send({ error: 'entry not found' });
      return res.status(200).send({ message: result.rows });
    })
      .catch(error => res.status(500).send({ error }));
  },
};
export default entryHandler;
