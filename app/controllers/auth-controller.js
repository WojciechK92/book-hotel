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
};

export default new AuthController;