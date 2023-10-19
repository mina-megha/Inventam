module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define(
    "categories",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      parentCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },

      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Categories;
};
