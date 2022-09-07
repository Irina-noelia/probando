function userLoggedMW(req, res, next) {
  res.locals.user = false;
  res.locals.mensaje = "Debes loguearte si queres acceder a eso";
  if (req.session.user) {
    res.locals.user = req.session.user;
    
  }
  
  next();
  
  
}
module.exports = userLoggedMW;
