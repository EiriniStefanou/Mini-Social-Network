/**
 * Account table schema
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Accounts",
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
        charset: "utf8",
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Accounts");
  },
};
