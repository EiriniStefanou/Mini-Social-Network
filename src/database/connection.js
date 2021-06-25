const Sequelize = require("sequelize");

const dbURI = "mysql://root:secret@0.0.0.0:3306/ergasia";

const sequelize = new Sequelize(dbURI, {
  dialect: "mysql",
});

module.exports = sequelize;
