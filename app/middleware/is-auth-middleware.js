export const isAdminAuthenticated = function(req, res, next) {
  // if (!req.session.admin) {
  //   res.redirect('/login');
  // };
  
  next();
};