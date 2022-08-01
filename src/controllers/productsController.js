const fs = require('fs');
const path = require('path');



const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	home: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		return res.render("products", {products:products});
	},

	
	createForm: (req, res) => {
		res.render("create", {products});
	  },

	
	create: function(req, res) {
	let productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    
    let nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      nombre: req.body.nombre,
	  descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.body.imagen,
    };

    productos.push(nuevoProducto);
    
    let nuevoProductoGuardar = JSON.stringify(productos, null, 2);
    fs.writeFileSync(productsFilePath, nuevoProductoGuardar, "utf-8");
    
    res.redirect("/products");
		
       },
	
	editForm: (req, res) => {
	let productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
	
	const id = req.params.id;
	let productoEditar = productos.find((prod) => prod.id == id);
	res.render("edit", { productoEditar });
	},
	
	editProcess: (req, res) => {
		let productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
	
		req.body.id = req.params.id;
		
		let productoUpdate = productos.map((prod) => {
		  if (prod.id == req.body.id) {
			return (prod = req.body);
		  }
		  return prod;
		});
		let productoActualizar = JSON.stringify(productoUpdate, null, 2);
		fs.writeFileSync(productsFilePath, productoActualizar, "utf-8");
		res.redirect("/products");
	  },

	  deleteForm: (req, res) => {
		let productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		
		const id = req.params.id;
		let productoBorrar = productos.find((prod) => prod.id == id);
		res.render("borrar", { productoBorrar });
		},

	// Delete - Delete one product from DB
	delete: (req, res) => {
		
		let productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		let id = req.params.id;
		let productoDelete = productos.filter((prod) => prod.id != id);
		let productoBorrar = JSON.stringify(productoDelete, null, 2);
		fs.writeFileSync(productsFilePath, productoBorrar, "utf-8");
		
		res.redirect("/products");
	  },
};

module.exports = controller;