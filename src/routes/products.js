// ************ Require's ************
const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

// ************ Controller Require ************

const ProductoController = require("../controllers/productosController");
const auth = require("../middlewares/authenticated");
// const auth = require('../middlewares/authenticated');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

/*** GET ALL PRODUCTS ***/
router.get("/products",  ProductoController.list);

/*
/*** CREATE ONE PRODUCT ***/
router.get("/create", ProductoController.add);
router.post("/create", upload.any(), ProductoController.almacenarEnDB);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", ProductoController.edit);
router.put("/edit/:id", ProductoController.editarRegistro);

router.get("/delete/:id", ProductoController.delete);
router.delete("/delete/:id", ProductoController.destroy);



module.exports = router;
