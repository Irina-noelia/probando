const Sequelize = require('sequelize');
const sequelize = require('../database'); 



const Ventas = sequelize.define(
	"ventas", {
		venta_id:Sequelize.INTEGER,
		fecha:Sequelize.DATE,
        medio_de_pago: Sequelize.STRING,
        total: Sequelize.DECIMAL,
        usuario_id : Sequelize.INTEGER,
	}, {timestamps: false,
}
);

module.exports = Ventas;