export default function(req, res, next) {
  res.locals.title = null;
  res.locals.form = {};
  res.locals.errors = null;
  res.locals.url = req.url;

  next();
};