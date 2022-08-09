const Sequelize = require('sequelize');
const sequelize = require('../database'); 



const Usuario = sequelize.define(
	"usuarios", {
		user_id:Sequelize.INTEGER,
		email:Sequelize.STRING,
        contraseña: Sequelize.STRING,
        image: Sequelize.STRING,
        clasificacion : Sequelize.STRING,
	}, {timestamps: false,
}
);

module.exports = Usuario;