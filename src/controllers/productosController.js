const db = require('../database/models');

const controller = {
    list_admin: (req, res) => {
        db.Product
            .findAll()
            .then(products => {
                res.render('producto_admin', {
                    products
                })
            })
    },

    list: (req, res) => {
        db.Product
            .findAll()
            .then(products => {
                res.render('products', {
                    products
                })
            })
    },
    almacenarEnDB: (req, res) => {
        let data = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
        db.Product
            .create(data)
            .then(() => {
                res.redirect('/admin');
            })
    },
    add: function (req, res) {
        res.render('create');
    },
    edit: (req, res) => {

        db.Product.findByPk(req.params.id).then((product) => {
            return res.render("edit", {
                producto: product
            });
        });


    },

    editarRegistro: (req, res) => {
        let imagen =  req.body.image[1]
        if (!imagen) {
        imagen = req.body.image[0]
        }
        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: imagen
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/admin');
    },
    delete: function (req, res) {
        let productId = req.params.id;
        db.Product
            .findByPk(productId)
            .then(producto => {
                return res.render('borrar', {
                    producto
                })
            })
            .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let productId = req.params.id;
        db.Product
            .destroy({
                where: {
                    id: productId
                },
                force: true
            })
            .then(() => {
                return res.redirect('/admin')
            })
            .catch(error => res.send(error))
    }

}
module.exports = controller;