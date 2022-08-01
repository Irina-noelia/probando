// ************ Require's ************
const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

// ************ Controller Require ************
const productsController = require("../controllers/productsController");
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
router.get("/products", auth, productsController.home);

/*
/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.createForm);
router.post("/create", upload.any(), productsController.create);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.editForm);
router.put("/edit/:id", productsController.editProcess);

router.get("/delete/:id", productsController.deleteForm);
router.delete("/delete/:id", productsController.delete);

/*** DELETE ONE PRODUCT***/
//router.???('/:id', productsController.destroy);

module.exports = router;
