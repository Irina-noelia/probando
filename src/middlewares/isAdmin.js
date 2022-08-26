module.exports = (req, res, next) => {
    if (req.body.admin == "on") {
      return res.redirect("products/admin");
    }else{
      return res.redirect("/products");
    }
    next();
  };
  