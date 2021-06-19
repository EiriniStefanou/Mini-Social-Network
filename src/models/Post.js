const { Sequelize, Model } = require("sequelize");

const connection = require("../database/connection");

class Post extends Model {}

Post.init(
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
    title: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: Sequelize.DataTypes.TEXT,
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
    modelName: "Post",
    timestamps: true,
  }
);

module.exports = Post;
