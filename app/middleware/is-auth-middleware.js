export const isAdminAuthenticated = function(req, res, next) {
  if (!req.session.admin) {
    res.redirect('/login/admin');
  };
  
  next();
};

export const isUserAuthenticated = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  };
  
  next();
};