import Trip from "../db/models/trip.js";

const tripsFiltration = async (queries, url) => {
  // filtration
  let where = {};
  // declaration and iniialization
  where.$and = [{ places: { $gte: 1 } }];
  
  // filtration 'all-inclusive' page
  if (url.includes('/all-inclusive')) {
    const obj = { $or: [
      { food: 'All-inclusive' },
      { food: { $in: queries.food } },
    ]};
    where.$and = [obj];
  };

  // filtration 'last-minute' page
  if (url.includes('/last-minute')) {
    const obj = { $or: [
      { popular: 'Last-minute'},
      { popular: { $in: queries.popular }},
    ]};
    where.$and = [obj];
  };

  // // filtration for all pages 

  if (queries.where) {
    const obj = { $or: [
        { country: { $regex: queries.where, $options: 'i' } },
        { region: { $regex: queries.where, $options: 'i'} },
        { city: { $regex: queries.where, $options: 'i'} },
      ],
    };
    where.$and.push(obj);
  };

  if (queries.start) {
    const startDate = new Date(queries.start);
    where.$and.push({ start: { $gte: startDate } });
  };

  if (queries.end) {
    const endDate = new Date(queries.end);
    where.$and.push({ end: { $lte: endDate } });
  };

  if (queries.persons) {
    where.$and.push({ places: { $gte: queries.persons } });
  };
  
  if (queries.food && !url.includes('/all-inclusive')) {
    const obj = { 
      $or: [
        { food: queries.food },
        { food: { $in: queries.food }},
      ],
    };
    where.$and.push(obj);
  };
  
  if (queries.hotelStandard) {
    const obj = { hotelStandard: { $gte: queries.hotelStandard } };
    where.$and.push(obj);
  };
  
  if (queries.priceMin || queries.priceMax) { 
    const obj = { price: { $gte: queries.priceMin || 0, $lte: queries.priceMax || 100000 } };
    where.$and.push(obj);
  };
  
  if (queries.days) { 
    const obj = { days: { $gte: queries.days.split('-')[0], $lte: queries.days.split('-')[1] } };
    where.$and.push(obj);
  };
  
  if(queries.transport) {
    const obj = { transport: queries.transport };
    where.$and.push(obj);
  };
  
  if (queries.rating) {
    const obj = { rating: { $gte: queries.rating } };
    where.$and.push(obj);
  };

  if (queries.popular && !url.includes('/last-minute')) {
    const obj = { 
      $or: [
        { popular: queries.popular }, 
        { popular: { $in: queries.popular }},
      ],
    };
    where.$and.push(obj);
  };

  let query = Trip.find(where);

  // sorting
  if (queries.sort) query = query.sort({ [queries.sort]: 'asc', _id: 'asc'})
  
  // pagination
  const tripsAmount = await Trip.find(where).count();  

  const page = (queries.page > 0 ) ? queries.page : 1; 
  const perPage = 2;
  const pagesAmount = Math.ceil(tripsAmount/perPage);

  query = query.skip(perPage * (page - 1));
  query = query.limit(perPage);
  
  return { query, page, pagesAmount };
};

export default tripsFiltration;
