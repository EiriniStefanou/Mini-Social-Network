const { Sequelize, Model } = require("sequelize");

const connection = require("../database/connection");

class Reaction extends Model {}

Reaction.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "User",
      },
      type: Sequelize.DataTypes.UUID,
    },
    postId: {
      allowNull: false,
      references: {
        key: "id",
        model: "User",
      },
      type: Sequelize.DataTypes.UUID,
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
    sequelize: connection,
    modelName: "Reaction",
    timestamps: true,
  }
);

module.exports = Reaction;
