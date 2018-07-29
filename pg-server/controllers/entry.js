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

  modifyEntry(req, res) {
    client.query(
      'SELECT createdAt FROM entries WHERE entryId=($1) LIMIT 1', [req.params.entryId],
    ).then((result) => {
      if (!result.rows.length) return res.status(404).send({ error: 'entry not found' });
      const createEntryDate = Date.parse(result.rows[0].createdat);
      const currentDate = Math.floor(Date.now());
      if (currentDate - createEntryDate >= 3600000) {
        return res.status(200).send({ message: 'sorry, cannot modify entry after 24hrs of when it was created or modified.' });
      }
      client.query(
        'UPDATE entries SET title=($1), entry=($2), createdAt=NOW() WHERE entryId=($3) RETURNING *', [req.body.title, req.body.entry, req.params.entryId],
      ).then(queryOut => res.status(200).send({ message: queryOut }));
    })
      .catch(error => res.status(500).send({ error }));
  },
};
export default entryHandler;