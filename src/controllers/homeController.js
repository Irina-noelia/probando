module.exports = {
  home: function (req, res) {
    return res.render("index", { title: "Express" });
  },

  pedido: function (req, res) {
    return res.render("pedido", { title: "Express" });
  },

  sabores: function (req,res) {
    return res.render("sabores", { title: "Express" });
  }
};
