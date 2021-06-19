const { Sequelize, Model } = require("sequelize");

const connection = require("../database/connection");
const User = require("./User");

class Account extends Model {}

Account.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    passwordHash: {
      allowNull: false,
      type: Sequelize.DataTypes.CHAR(64),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },
    sequelize: connection,
    modelName: "Account",
    timestamps: true,
  }
);

module.exports = Account;

Account.hasOne(User, {
  foreignKey: {
    name: "accountId",
    allowNull: false,
  },
});

User.belongsTo(Account, { foreignKey: "accountId" });
