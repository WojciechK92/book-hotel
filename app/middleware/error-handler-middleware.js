export default function(error, req, res, next) {
  if (error) {
    return res.render('pages/admin/addTrip', {
      errors: { image: { message: error.message }},
      layout: 'layouts/auth',
      title: 'Add trip',
      form: req.body,
    });
  };

  next();
};