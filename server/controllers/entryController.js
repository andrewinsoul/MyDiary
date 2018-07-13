import entry from '../models/entry';

export default class entryHandler {
  static createEntry(req, res) {
    const newEntry = {
      id: entry.length += 1,
      title: req.body.title,
      description: req.body.desc,
      diaryId: req.body.diaryId,
    };
    entry.push(newEntry);
    entry.splice(entry.length - 2, 1);
    return res.status(200).send({ msg: 'entry successfully added to diary' });
  }
}
