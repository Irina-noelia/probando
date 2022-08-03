module.exports = (req, res, next) => {
    if (req.body.admin == "on") {
      return res.redirect("/admin");
    }
    next();
  };
  