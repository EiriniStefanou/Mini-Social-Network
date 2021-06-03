const { Sequelize, Model } = require("sequelize");

const connection = require("../database/connection");

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    surname: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
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
    modelName: "User",
    timestamps: true,
  }
);

module.exports = User;
