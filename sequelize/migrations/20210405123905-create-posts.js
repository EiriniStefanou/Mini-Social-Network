/**
 * Post table schema
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Posts",
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
            model: "Users",
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
        charset: "utf8",
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Posts");
  },
};
