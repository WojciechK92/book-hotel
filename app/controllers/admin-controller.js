import Admin from '../db/models/admin.js';
import Trip from '../db/models/trip.js';

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

  async showAdminPanel(req, res) {
    const trips = await Trip.find({});

    res.render('pages/admin/trips', {
      layout: 'layouts/auth',
      title: 'Admin panel',
      trips,
    });
  };

  showAddTripForm(req, res) {
    res.render('pages/admin/addTrip', {
      layout: 'layouts/auth',
      title: 'Admin panel',
    });
  };

  async addTrip(req, res) {

    const trip = new Trip({
      country: req.body.country,
      region: req.body.region,
      city: req.body.city,
      hotelName: req.body.hotelName,
      hotelStandard: req.body.hotelStandard, 
      start: req.body.start,
      end: req.body.end,
      from: req.body.from,
      food: req.body.food,
      transport: req.body.transport,
      popular: req.body.popular,
      places: req.body.places,
      price: req.body.price,
      admin: req.session.admin._id,
      image: req.file?.filename,
    });

    try {
      await trip.save();
      res.redirect('/admin');

    } catch(e) {
      res.render('pages/admin/addTrip', {
        layout: 'layouts/auth',
        form: req.body,
        title: 'Add trip',
        errors: e.errors, 
      });
    };
  };

  async showEditTripForm(req, res) {
    const { id } = req.params;    
    
    try {
      const trip = await Trip.findById(id);

      res.render('pages/admin/editTrip', {
        layout: 'layouts/auth',
        title: 'Admin panel',
        form: trip,
      });
    } catch(e) {
      res.render('pages/admin/editTrip', {
        layout: 'layouts/auth',
        title: 'Admin panel',
      });
    };

  };

  async editTrip(req, res) {

    const { id } = req.params;
    const trip = await Trip.findById(id);

    trip.country = req.body.country;
    trip.region = req.body.region;
    trip.city = req.body.city;
    trip.hotelName = req.body.hotelName;
    trip.hotelStandard = req.body.hotelStandard;
    trip.start = req.body.start;
    trip.end = req.body.end;
    trip.from = req.body.from;
    trip.food = req.body.food;
    trip.transport = req.body.transport;
    trip.popular = req.body.popular;
    trip.places = req.body.places;
    trip.price = req.body.price;
    trip.admin = req.session.admin._id;

    if (req.file) {
      trip.image = req.file.filename;
    }; 
    
    try {
      await trip.save();
      res.redirect('/admin');

    } catch(e) {
      res.render('pages/admin/addTrip', {
        layout: 'layouts/auth',
        form: req.body,
        title: 'Add trip',
        errors: e.errors, 
      });
    };
  };

  async deleteTrip(req, res) {
    const { id } = req.params;

    try {
      await Trip.deleteOne({ _id: id });
      res.redirect('/admin');
    } catch(e) {
      console.log(e.erros);
    };

  };
};

export default new AdminController;