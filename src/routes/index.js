const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController');
const authenticated = require('../middlewares/authenticated');

/* GET home page. */
router.get('/', controller.home);

router.get('/sabores', controller.sabores)

module.exports = router;
