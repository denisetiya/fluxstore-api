const dbConf = require('../config/dbConf');

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
  dbConf.DB, 
  dbConf.USER, 
  dbConf.PASSWORD, {
    host: dbConf.HOST,
    dialect: dbConf.dialect,
    operatorAliases: false,
    pool: {
      max: dbConf.pool.max,
      min: dbConf.pool.min,
      acquire: dbConf.pool.acquire,
      idle: dbConf.pool.idle
    }
})

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
})

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;