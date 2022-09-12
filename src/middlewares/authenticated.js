const authenticated = (req, res, next) => {
  if (!req.session.user) {
   
    res.locals.mustLogging = "Debes loguearte si queres acceder a productos";
    
    return res.render("auth/login");
  }
  next();
};

module.exports = authenticated;
