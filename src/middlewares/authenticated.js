const authenticated = (req, res, next) => {
  if (!req.session.user) {
   
    res.locals.mustLogging = "Debes registrarte si queres acceder a eso";
    
    return res.redirect("/login");
  }
  next();
};

module.exports = authenticated;
