const { Sequelize, Model } = require("sequelize");

const connection = require("../database/connection");
const Post = require("./Post");

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    accountId: {
      allowNull: false,
      references: {
        key: "id",
        model: "Account",
      },
      type: Sequelize.DataTypes.UUID,
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
    sequelize: connection,
    modelName: "User",
    timestamps: true,
  }
);

module.exports = User;

User.hasMany(Post, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

Post.belongsTo(User, { foreignKey: "userId" });
