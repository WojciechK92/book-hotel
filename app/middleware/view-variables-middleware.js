export default function(req, res, next) {
  res.locals.title = null;

  next();
};