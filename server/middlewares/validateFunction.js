export default function validateUserResource(req, res, next) {
  if (req.method === 'POST') {
    if (req.url === '/users') {
      req.checkBody('name', 'name isi required').notEmpty();
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email should be valid').isEmail();
      req.checkBody('username', 'username is required').notEmpty();
      req.checkBody('password1', 'password1 is required').notEmpty();
      req.checkBody('password2', 'password2 is required').notEmpty();
    }
    else if (req.url === '/login') {
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email should be valid').isEmail();
      req.checkBody('password', 'password is required').notEmpty();
    }
    else if (req.url === '/diaries') {
      req.checkBody('name', 'name is required').notEmpty();
      req.checkBody('userId', 'userId is required').notEmpty();
      req.checkBody('userId', 'userId should be an integer').isInt();
      req.checkBody('desc', 'description is required').notEmpty();
      req.checkBody('desc', 'the description field must not be greater than 150 characters').isLength({ max: 150 });
      req.checkBody('type', 'type is required').notEmpty();
    }
    else if (req.url === '/entries') {
      req.checkBody('entry', 'text of entry is required').notEmpty();
      req.checkBody('diaryId', 'diaryId is required').notEmpty();
      req.checkBody('diaryId', 'diaryId should be an integer').isInt();
    }
  }
  else if (req.method === 'PUT') {
    req.checkBody('entryText', 'text of entry is required').notEmpty();
  }
  const error = req.validationErrors();
  if (error) return res.status(400).send({ message: 'validation failed', failures: error });
  return next();
}
