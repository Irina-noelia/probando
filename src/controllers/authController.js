const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");


const db = require('../database/models');



const controller = {
  
  showLogin: function (req, res) {
    return res.render("auth/login");
  },
  login: function (req, res) {
    //validar los datos
    let errores = validationResult(req);

    //si hay errores, retornarlos a la vista
    if (!errores.isEmpty()) {
      let errors = errores.mapped();
      console.log(errors);
      return res.render("auth/login", { errors: errors, olds: req.body });
    }

    //buscar al usuario
    db.User.findOne({
      where: {email : req.body.email}})
      .then((user) => {
    
        let compararPass = bcryptjs.compareSync(
           req.body.password,
           user.password)
        console.log(user.password, req.body.password, compararPass)
        if(compararPass){
          req.session.user = user.dataValues
          return res.render("index");
        }else {
          return res.render("auth/login", {errors : { email : { msg: 'Email invalido'}}});
        }
        
      })

      //let pass = bcrypt.hash(user.password);
    /*
    {errors : { email : { msg: 'Email invalido'}}}
    if(user){
      if(user.password )
      console.log('login success')
    }
     */ 
    /*if (!user) {
      return res.send("usuario o clave invalido");
    }
    const passwordEncriptada = bcrypt.hashSync(user.password, 10);
    //comparar las passwords
    if (!bcryptjs.compareSync(req.body.password, passwordEncriptada)) {
      return res.render("auth/error-user");
    }
    */

    //guardar en session, sacar el password por seguridad
    //req.session.user = user;

    //guardo en la session la fecha en formato numero para luego comparar y validar que no pasen mas de
    // X minutos de inactividad
    req.session.lastActitity = Date.now();

    //si está el recuerdame, le guardo una cookie
    /*if (req.body.rememberMe) {
      res.cookie("remember-me", user.email, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
    }
    */
    //if (req.body.admin =="on" ){
    //    return res.redirect("/create")
    //}

    //redirigir al perfil
    
  },
  showRegister: function (req, res) {
    return res.render("auth/register");
  },
  register: async function (req, res) {
    //validar los datos
    let errores = validationResult(req);

    //si hay errores, retornarlos a la vista
    if (!errores.isEmpty()) {
      let errors = errores.mapped();
      console.log(errors);
      return res.render("auth/register", { errors: errors, olds: req.body });
    }


    //si hay imagen
    let image = "";
    if (req.file) {
      //le saco la palabra public para que sea a partir
      image = req.file.filename;
    }

    //para mayor seguridad guardo el password de manera encriptada
    // spoiler alert bcryptjs
    const pass = bcryptjs.hashSync(req.body.password, 10);
    
    //guardo el nuevo usuario 
     let user = {
      email: req.body.email,
      password: pass,
      img: null,
      admin: req.body.admin
    };
    let newUser = await db.User.create(user)
    req.session.user = newUser

    

    //hago algo más? <--------
    //luego a donde redirijo? <-----------
    return res.redirect("/login"); //solucionar para ir al login
  },
  logout: function (req, res) {
    //eliminar la session

    req.session.destroy();
    return res.redirect("/");
    //si tengo el rememberme, eliminar la cookie
    //res.clearCookie('key')
  },
  profile: function (req, res) {
   
  },
  
};

module.exports = controller;
