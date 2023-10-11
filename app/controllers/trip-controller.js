import Trip from '../db/models/trip.js';

class TripController {
  async showPageWithTrips(req, res) {
    const queries = req.query;

    // filtration
    let query = Trip.find({}).sort({ [queries.sort]: 'asc'});

    // filtration 'all-inclusive' page only
    if (req.url.includes('/all-inclusive')) {
      if (!queries.food) {
        query = query.find({ food: 'All-inclusive'});
      } else {
        query = query.find({ 
          $or: [
            { food: 'All-inclusive'},
            { food: queries.food },
            { food: { $in: queries.food }},
        ]});
      }
    };
    
    // filtration 'last-minute' page only
    if (req.url.includes('/last-minute')) {
      if (!queries.popular) {
        query = query.find({ popular: 'Last-minute'});
      } else {
        query = query.find({ 
          $or: [
            { popular: 'Last-minute'},
            { popular: queries.popular},
            { popular: { $in: queries.popular}},
          ]
        });
      };
    };

    // filtration for all pages 
    if (queries.food) {
      query = query.find({ 
        $or: [
          { food: queries.food },
          { food: { $in: queries.food }},
      ]});
    };
    if (queries.hotelStandard) query = query.find({ hotelStandard: { $gte: queries.hotelStandard }})
    if (queries.priceMin || queries.priceMax) { 
      query = query.find({ 
        price: { $gte: queries.priceMin ?? 0, $lte: queries.priceMax ?? 100000 }
      });
    };
    if (queries.days) query = query.find({ 
      days: { $gte: queries.days.split('-')[0], $lte: queries.days.split('-')[1] }
    });
    if(queries.transport) query = query.find({ transport: { $regex: queries.transport }});
    if (queries.rating) query = query.find({ rating: { $gte: queries.rating }});
    if (queries.popular) {
      query = query.find({
        $or: [
          { popular: queries.popular }, 
          { popular: { $in: queries.popular }},
        ],
      });
    };

    const trips = await query.exec();
    
    res.render('pages/trips/trips', {
      trips, 
      checkedOption: 'All-inclusive',
      form: {...queries},
    });
  };
};

export default new TripController;