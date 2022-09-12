const db = require('../database/models');
 
const controller = {
    list_admin: (req, res) => {
        db.Product
        .findAll()
            .then(products => {
                res.render('producto_admin', {products})
            })
    },

   list: (req, res) => {
      db.Product
      .findAll()
          .then(products => {
              res.render('products', {products})
          })
  },
  almacenarEnDB: (req, res) => {
     db.Product
        .create({
           name: req.body.name,
           price: req.body.price,
           description: req.body.description,
           image:req.body.image

        })
        .then(products => {
           res.redirect('/admin');
        })
   },
   add: function (req, res) {
   res.render('create');  
   },
   edit:   (req, res) => {
      
        db.Product.findByPk(req.params.id).then((product) => {
         return res.render("edit", { producto: product });
       });
   
       
   },

  editarRegistro: (req, res) => {
      db.Product.update({
      name: req.body.name,      
      description: req.body.description,
      price: req.body.price}, {
         where : {id: req.params.id }
      }
     )
     res.redirect('/admin');
  },
  delete: function (req, res) {
   let productId = req.params.id;
   db.Product
   .findByPk(productId)
   .then(producto => {
       return res.render('borrar', {producto})})
   .catch(error => res.send(error))
},
    destroy: function (req, res) {
        let productId = req.params.id;
       db.Product
        .destroy({where: {id: productId}, force: true}) 
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    }

}
module.exports = controller;

