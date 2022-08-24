const db = require('../database/models');
 
const controller = {
    pedido: function (req, res) {
        return res.render("pedido");
      },
  }
  module.exports = controller;