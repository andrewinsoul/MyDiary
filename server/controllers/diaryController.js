import diary from '../models/diary';

export default class diaryHandler {
  static createDiary(req, res) {
    const newDiary = {
      id: diary.length += 1,
      name: req.body.name,
      description: req.body.desc,
      userId: req.body.userId,
      type: req.body.type,
    };
    diary.push(newDiary);
    diary.splice(diary.length - 2, 1);
    return res.status(200).send({ msg: newDiary });
  }

  static deleteDiary(req, res) {
    const diaryIndex = diary.findIndex(item => item.id === Number(req.params.id));
    if (diaryIndex === -1) {
      return res.status(404).send({ error: 'Diary not found' });
    }
    diary.splice(diaryIndex, 1);
    return res.status(204).send({ msg: 'diary successfully deleted' });
  }
}
