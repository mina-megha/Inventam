const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      collate: "utf8_general_ci",
    },
    logQueryParameters: true,
    //logging: false,
    freezeTableName: true,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require("./categorySchema")(sequelize, Sequelize);

module.exports = db;
