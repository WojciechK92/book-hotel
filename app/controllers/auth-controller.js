import User from '../db/models/user.js';

class AuthController {
  showLoginForm(req, res) {
    res.render('pages/auth/login', {
      layout: 'layouts/auth',
      title: 'Login',
    });
  };

  login(req, res) {
    const form = req.body;

    try {

    } catch(e) {
      
    };

    res.render('pages/auth/login', {
      layout: 'layouts/auth',
      form,
      errors: '',
      title: 'Login',
    });
  };

  showRegisterForm(req, res) {
    res.render('pages/auth/register', {
      layout: 'layouts/auth',
      title: 'Registration',
    });
  };

  async register(req, res) {
    const form = req.body;

    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      res.redirect('/login');

    } catch(e) {
      res.render('pages/auth/register', {
        layout: 'layouts/auth',
        title: 'Registration',
        errors: e.errors,
        form,
      });

    };
  };
};

export default new AuthController;