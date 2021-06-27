/**
 * Reactions table schema
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Reactions",
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
        postId: {
          allowNull: false,
          references: {
            key: "id",
            model: "Posts",
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
        charset: "utf8",
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Reactions");
  },
};
