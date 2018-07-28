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
    if (req.url === '/auth/login') {
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email should be valid').isEmail();
      req.checkBody('password', 'password is required').notEmpty();
    }
    const error = req.validationErrors();
    if (error) return res.status(400).send({ message: 'validation failed', failures: error });
    return next();
  }
}
