const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: {type: DataTypes.INTEGER, allowNull: false},
        drink_id: {type: DataTypes.INTEGER, allowNull: false}
    }


    return sequelize.define('user-drinks', attributes);
}
