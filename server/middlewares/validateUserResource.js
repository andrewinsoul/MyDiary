export default function validateUserResource(req, res, next) {
  if (req.method === 'POST') {
    if (req.url === '/auth/signup') {
      req.checkBody('name', 'name is required').notEmpty();
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email should be valid').isEmail();
      req.checkBody('username', 'username is required').notEmpty();
      req.checkBody('password', 'password is required').notEmpty();
      req.checkBody('password', 'password should be at least 8 characters long').isLength({ min: 8 });
      req.checkBody('confirmPassword', 'confirmPassword is required').notEmpty();
      req.checkBody('confirmPassword', 'confirmPassword should be at least 8 characters long').isLength({ min: 8 });
    }
    else if (req.url === '/auth/login') {
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email should be valid').isEmail();
      req.checkBody('password', 'password is required').notEmpty();
    }
    else if (req.url === '/diaries') {
      req.checkBody('name', 'name of diary is required').notEmpty();
      req.checkBody('type', 'type of diary is required').notEmpty();
      req.checkBody('userId', 'userId is required').notEmpty();
      req.checkBody('userId', 'userId must be an integer').isInt();
      req.checkBody('desc', 'desc is required').notEmpty();
    }
    else if (req.url === '/entries') {
      req.checkBody('title', 'title is required').notEmpty();
      req.checkBody('entry', 'entry is required').notEmpty();
      req.checkBody('diaryId', 'diaryId is required').notEmpty();
      req.checkBody('diaryId', 'diaryId must be an integer').isInt();
    }
  }
  else if (req.method === 'PUT') {
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('entry', 'entry is required').notEmpty();
  }
  const error = req.validationErrors();
  if (error) return res.status(400).send({ failures: error.map(err => err.msg) });
  return next();
}
