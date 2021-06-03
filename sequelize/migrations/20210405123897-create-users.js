/**
 * User table schema
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Users",
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
            model: "Accounts",
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
        charset: "utf8",
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Users");
  },
};
