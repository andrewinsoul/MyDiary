export default function validateUserResource(req, res, next) {
  if (req.method === 'POST') {
    if (req.url === '/users') {
      req.checkBody('name', 'name isi required').notEmpty();
      req.checkBody('email', 'a valid mail is required').notEmpty().isEmail();
      req.checkBody('username', 'username is required').notEmpty();
      req.checkBody('password1', 'password1 is required').notEmpty();
      req.checkBody('password2', 'password2 is required').notEmpty();
    }
    else if (req.url === '/login') {
      req.checkBody('email', 'a valid mail is required').notEmpty().isEmail();
      req.checkBody('password', 'password is required').notEmpty();
    }
  }
  const error = req.validationErrors();
  if (error) return res.status(400).send({ message: 'validation failed', failures: error });
  return next();
}
