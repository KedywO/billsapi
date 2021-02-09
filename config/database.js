const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = db = {};

initialize();

async function initialize() {
    const dbConnector = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
    });

    const sequelizeUser = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,
        process.env.DB_PASSWORD,{dialect: 'mysql', define: {timestamps: false, tableName: 'users'}});

    const sequelizeDrink = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,
        process.env.DB_PASSWORD,{dialect: 'mysql', define: {timestamps: false, tableName: 'user-drinks'}});

    db.User = require('../models/user.model')(sequelizeUser);
    db.Drinks = require('../models/drink.user.model')(sequelizeDrink);

    await sequelizeDrink.sync();
    await sequelizeUser.sync();
}