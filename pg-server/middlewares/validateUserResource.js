export default function validateUserResource(req, res, next) {
  if (req.method === 'POST') {
    if (req.url === '/auth/signup') {
      req.checkBody('name', 'name is required').notEmpty();
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email should be valid').isEmail();
      req.checkBody('username', 'username is required').notEmpty();
      req.checkBody('password', 'password is required').notEmpty();
      req.checkBody('password', 'password should be at least 8 characters long').isLength({ min: 8 });
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
      req.checkBody('desc', 'description of diary is required').notEmpty();
    }
    else if (req.url === '/entries') {
      req.checkBody('title', 'title of entry is required').notEmpty();
      req.checkBody('entry', 'entry text is required').notEmpty();
      req.checkBody('diaryId', 'The id of diary is required').notEmpty();
      req.checkBody('diaryId', 'id of diary must be an integer').isInt();
    }
    const error = req.validationErrors();
    if (error) return res.status(400).send({ message: 'validation failed', failures: error });
    return next();
  }
}
