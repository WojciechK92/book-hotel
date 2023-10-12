import { tripsFiltration } from "../services/filtration.js";

class TripController {
  async showPageWithTrips(req, res) {
    const queries = req.query;

    const query = tripsFiltration(queries, req.url); 

    const trips = await query.exec();
    
    res.render('pages/trips/trips', {
      trips, 
      form: {...queries},
    });
  };
};

export default new TripController;