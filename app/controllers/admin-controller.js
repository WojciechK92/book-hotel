import Admin from '../db/models/admin.js';

class AdminController {
  showLoginForm(req, res) {
    res.render('pages/auth/login', {
      layout: 'layouts/auth',
      title: 'Login as admin',
    });
  };

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) throw new Error('Wrong email');

      const validPassword = admin.comparePassword(password);
      if (!validPassword) throw new Error('Wrong password');

      console.log('admin');

      req.session.admin = admin;
      res.redirect('/admin');

    } catch(e) {
      res.render('pages/auth/login', {
        layout: 'layouts/auth',
        title: 'Login as admin',
        form: req.body,
        errors: true,
      });
    };
  };

  showAdminPanel(req, res) {
    res.render('pages/admin/trips', {
      layout: 'layouts/auth',
    });
  };

  showAddTripForm(req, res) {
    res.render('pages/admin/addTrip');
  };
};

export default new AdminController;