const Sequelize = require('sequelize');
const sequelize = require('../database'); 



const Productos = sequelize.define(
	"productos", {
		producto_id:Sequelize.INTEGER,
		nombre:Sequelize.STRING,
        descripcion: Sequelize.STRING,
        precio: Sequelize.DECIMAL,
        image: Sequelize.STRING,
        categoria : Sequelize.STRING,
	}, {timestamps: false,
}
);

module.exports = Productos;