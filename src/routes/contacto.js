const express = require('express');
const router = express.Router();

const controller = require('../controllers/contactoController');


/* GET home page. */
router.get('/', controller.contacto);



module.exports = router;
