import Trip from '../db/models/trip.js';
import User from '../db/models/user.js';

class TripController {
  async showAllInclusive(req, res) {
    const food = [
      {value: 'all-inclusive', label: 'All inclusive', checked: true}, 
      {value: 'HB', label: 'Breakfast and dinner', checked: false}, 
      {value: 'BB', label: 'Breakfast', checked: false}, 
      {value: 'FB', label: 'Three meals', checked: false}, 
    ];

    const popular = [
      {value: 'last-minute', label: 'Last minute', checked: false}, 
      {value: 'winter2023', label: 'Winter 2023', checked: false}, 
      {value: 'summer2024', label: 'Summer 2024', checked: false}, 
      {value: 'poland2024', label: 'Poland 2024', checked: true}, 
    ];
    
    try {
      const trips = await Trip.find({});

      res.render('pages/trips/trips', {
        food,
        popular,
        trips, 
      });
    } catch(e) {
      console.log(e.errors); 
    };
  };

  async showTrip(req, res) {
    const { id } = req.params;

    try {
      const trip = await Trip.findById(id);

      res.render('pages/trips/trip', {
        trip,
      });
    } catch(e) {
      console.log(e.errors);
    };

  };

  async bookTrip(req, res) {
    const { tripId, option } = req.body; 
    
    try {
      const trip = await Trip.findById(tripId);
      if (!trip) throw new Error("Trip doesn't exist");
  
      if (option === 'add') {
        const trips = req.session.user.trips;
        trips.push(trip._id.toString());

        const filter = { _id: req.session.user._id };
        const update = { trips };
        const options = { runValidators: true };

        await User.updateOne(filter, update, options);

        const user = await User.findById(req.session.user._id);
        req.session.user = user;

        res.status(201).json({ message: 'Trip added' });
          
      } else {

        const trips = req.session.user.trips.filter(id => id !== tripId)
        
        const filter = { _id: req.session.user._id };
        const update =  { trips };
        const options = { runValidators: true };
       
        await User.updateOne(filter, update, options);
        const user = await User.findById(req.session.user._id);
        req.session.user = user;
  
        res.sendStatus(204);
      };

    } catch(e) {
      console.log(e);
    }
  };
};

export default new TripController;