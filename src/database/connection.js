const Sequelize = require("sequelize");

const dbURI = "mysql://root:secret@0.0.0.0:3306/ergasia";

const sequelize = new Sequelize(dbURI, {
  dialect: "mysql",
});

// sequelize.sync({ force: true }).then(
//   function (err) {
//     console.log('It worked!');
//   },
//   function (err) {
//     console.log('An error occurred while creating the table:', err);
//   }
// );

module.exports = sequelize;
