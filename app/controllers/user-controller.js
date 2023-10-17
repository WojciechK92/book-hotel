import User from '../db/models/user.js';
import Trip from '../db/models/trip.js';

class UserController {
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

  showLoginForm(req, res) {
    res.render('pages/auth/login', {
      layout: 'layouts/auth',
      title: 'Login',
    });
  };

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Wrong email');
      
      const validPassword = user.comparePassword(password);
      if (!validPassword) throw new Error('Wrong password');
      
      req.session.user = user; 
      res.redirect('/');

    } catch(e) {
      res.render('pages/auth/login', {
        layout: 'layouts/auth',
        title: 'Login',
        form: req.body,
        errors: true,
      });
    };
  };

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  };

  async showEditProfileForm(req, res) {
    try {
      const user = await User.findById(req.session.user._id);
  
      res.render('pages/auth/edit', {
        layout: 'layouts/auth',
        title: 'Edit profile',
        form: user,
      });
    } catch(e) {
      console.log(e);
    }
  };

  async editProfile(req, res) {
    try {
      const user = await User.findById(req.session.user._id);
      user.email = req.body.email;    
      user.password = req.body.password;
      
      await user.save();

      req.session.user = user;
      res.redirect('/profile/edit');
    } catch(e) {
      res.render('pages/auth/edit', {
        layout: 'layouts/auth',
        title: 'Edit profile',
        form: req.body,
        errors: e.errors,
      });
    };
  };

  async showProfileTrips(req, res) {
    try {
      const user = await User.findById(req.session.user._id); 
      const trips = await Trip.find({ _id: { $in: user.trips } });
  
      res.render('pages/trips/profileTrips', {
        layout: 'layouts/auth',
        title: 'My trips',
        trips,
      });
    } catch(e) {
      console.log(e);
    };
  };
};

export default new UserController;