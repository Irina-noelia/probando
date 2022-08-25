module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        iduser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        
        image: {
            type: dataTypes.STRING
        },
        admin : {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    return User
}