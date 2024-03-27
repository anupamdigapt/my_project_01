const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'test',
    process.env.DB_USERNAME || 'root',
    process.env.DB_PASSWORD || null,
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DRIVER || 'mysql'
    }
);

module.exports = {
    sequelize
};