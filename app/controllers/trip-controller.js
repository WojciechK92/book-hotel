import Trip from '../db/models/trip.js';
import User from '../db/models/user.js';

import tripsFiltration from "../services/filtration.js";

class TripController {
  async showPageWithTrips(req, res) {
    const queries = req.query;
    
    const { query, page, pagesAmount } = await tripsFiltration(queries, req.url); 

    const trips = await query.exec();

    res.render('pages/trips/trips', {
      trips, 
      form: {...queries},
      page,
      pagesAmount,
      title: 'Trips',
    });
  };

  async showTrip(req, res) {
    const { id } = req.params;

    try {
      const trip = await Trip.findById(id);

      res.render('pages/trips/trip', {
        trip,
        title: 'Trip',
        layout: 'layouts/auth'
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