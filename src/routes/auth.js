const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const { check } = require("express-validator");
const db = require("../database/models");

const controller = require("../controllers/authController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
//const isLogged = require('../middlewares/userLogged');
//const authenticated = require("../middlewares/authenticated");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
const validatorLogin = [
  check("email")
    .notEmpty()
    .withMessage("Debes completar el mail")
    .isEmail()
    .withMessage("El email es invalido"),
  
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Debes completar la contraseña")
    .bail()
    .isLength({
      min: 8,
    })
    .withMessage("La constraseña debe contener al menos 8 caracteres")

]
const validator = [
  check("email")
    .notEmpty()
    .withMessage("Debes completar el mail")
    .isEmail()
    .withMessage("El email es invalido"),
  
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Debes completar la contraseña")
    .bail()
    .isLength({
      min: 8,
    })
    .withMessage("La constraseña debe contener al menos 8 caracteres")
    .bail()
    .custom(async (password, { req }) => {
      const cpassword = req.body["confirm-password"];

      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (cpassword !== password) {
        throw new Error("Las pass deben coincidir");
      }
    })
    .bail(),

  // check("image").custom((value, { req }) => {
  //   if ((req.files.mimetype !== "jpg", "jpeg", "png", "gif")) {
  //     throw new Error("Solo se aceptan jpg, jpeg, png y gif");
  //   }
  // }),
];

router.get("/login", controller.showLogin);
router.post("/login",validatorLogin, controller.login);

router.get("/register", redirectIfAuthenticated, controller.showRegister);
router.post("/register", upload.single("img"), validator, controller.register);

router.get("/logout", controller.logout);

router.get("/profile", controller.profile);

module.exports = router;
