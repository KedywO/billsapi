const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: {type: DataTypes.STRING, allowNull:false},
        password: {type: DataTypes.STRING, allowNull:false},
        city: {type: DataTypes.STRING, allowNull:false},
        mail: {type: DataTypes.STRING, allowNull:false}
    };

    const options = {
        defaultScope: {
            attributes: {exclude: ['password']}
        },
        scopes: {
            withPassword: {attributes: {},}
        }
    };

    return sequelize.define('User', attributes, options);

}