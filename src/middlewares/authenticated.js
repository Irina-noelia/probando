const authenticated = (req, res, next) => {
  if (!req.session.user) {
    console.log("e sta pasando");
    res.locals.mustLogging = "Debes loguearte si queres acceder a eso";
    
    return res.redirect("/login");
  }
  next();
};

module.exports = authenticated;
