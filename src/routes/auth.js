const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const { check } = require("express-validator");

const controller = require("../controllers/authController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
const isAdmin = require("../middlewares/isAdmin");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });



router.get("/login",  controller.showLogin);
router.post("/login", controller.login);

router.get("/register", redirectIfAuthenticated, controller.showRegister);
router.post(
  "/register",
  upload.any(),
  [
    check("email").isEmail().withMessage("El email es invalido"),
    check("password", "Password invalido")
      .trim()
      .notEmpty()
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
  ],
  controller.register
);

router.get("/logout", controller.logout);

router.get("/profile", controller.profile);



module.exports = router;
