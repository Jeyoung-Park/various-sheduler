require("dotenv").config();

const Sequelize = require("sequelize");
const User = require("./user");
const Scrap = require("./scrap");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.User = User;
db.Scrap = Scrap;

User.init(sequelize);
Scrap.init(sequelize);

module.exports = db;
