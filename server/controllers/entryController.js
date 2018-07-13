import entries from '../models/entry';

export default class entryHandler {
  static createEntry(req, res) {
    const newEntry = {
      id: entries.length += 1,
      entry: req.body.entry,
      diaryId: req.body.diaryId,
      time: new Date(),
    };
    entries.push(newEntry);
    entries.splice(entries.length - 2, 1);
    return res.status(200).send({ msg: newEntry });
  }

  static getEntryById(req, res) {
    const index = entries.findIndex(entry => entry.id === Number(req.params.id));
    if (index === -1) return res.status(404).send({ error: 'entry not found' });
    return res.status(200).send({ msg: entries[index] });
  }

  static getAllEntries(req, res) {
    return res.status(200).send({ msg: entries });
  }

  static modifyEntry(req, res) {
    const index = entries.findIndex(entry => entry.id === Number(req.params.id));
    entries[index].entry = req.body.entryText;
    return res.status(200).send({ msg: 'entry successfully modified' });
  }
}
