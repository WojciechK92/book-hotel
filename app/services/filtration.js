import Trip from "../db/models/trip.js";

export const tripsFiltration = (queries, url) => {
  let query = Trip.find({})

  // filtration 'all-inclusive' page only
  if (url.includes('/all-inclusive')) {
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
  if (url.includes('/last-minute')) {
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
  if (queries.where) {
    query = query.find({ 
      $or: [
        { country: { $regex: queries.where, $options: 'i' } },
        { region: { $regex: queries.where, $options: 'i'} },
        { city: { $regex: queries.where, $options: 'i'} },
      ]
    });
  };

  if (queries.start) {
    const start = new Date(queries.start);
    query = query.find({ 
      start: { $gte: start },
    });
  };
  if (queries.end) {
    const end = new Date(queries.end);
    query = query.find({ 
      end: { $lte: end }
    });
  };

  if (queries.persons) {
    query = query.find({ places: { $gte: queries.persons } });
  };

  if (queries.sort) query = query.sort({ [queries.sort]: 'asc'});

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

  return query;
};