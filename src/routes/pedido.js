const express = require('express');
const router = express.Router();

const controller = require('../controllers/pedidoController');

router.get("/pedido", controller.pedido)

module.exports = router;
