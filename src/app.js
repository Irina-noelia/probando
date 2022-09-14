const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mo = require("method-override");
const ses = require("express-session");
const multer = require("multer");
const userLogged = require("./middlewares/userLogged");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const pedidoRouter = require("./routes/pedido");
const contactoRouter = require("./routes/contacto")

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mo("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  ses({ secret: "es un secreto", resave: false, saveUninitialized: false })
);

app.use(userLogged);

// esto es un middleware de tiempo de session
app.use(function (req, res, next) {
  let dateNow = Date.now();
  console.log("dateNow", dateNow);
  // reviso si es un usuario
  if (req.session.user && req.session.lastActitity) {
    // resto las fecha en formato numerico
    let compare = dateNow - req.session.lastActitity;
    console.log("fechas comparadas", compare);
    // si es mayor a 30 min, redirijo al login
    if (compare > 1000 * 60 * 30) {
      req.session.destroy();
      return res.redirect("/login");
    }
    // sino actualizo la fecha en formato numerico
    req.session.lastActitity = dateNow;
  }
  return next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);
app.use("/", productsRouter);
app.use("/", pedidoRouter);
app.use("/admin", productsRouter);
app.use("/contacto", contactoRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render("errors/404");
  //next(createError(404));
});

// vista no encontrada
app.use(function (err, req, res, next) {
  console.log(err);
  if (err["view"] != null) {
    console.error("errorView", err.message);
    return res.render("errors/500");
  }
  return next();
});

// error handler
app.use(function (err, req, res, next) {
  console.log("errorHandler", err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
