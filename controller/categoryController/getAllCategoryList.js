let db = require("../../schema/db");
const categories = db.categories;
const Sequelize = db.Sequelize;
const helper = require("../../helpers/helper");
const { failMessage, successMessage } = require("../../response/response");
module.exports.getAllCategories = async (req, res) => {
  try {
    var categoriesData = await categories.findAll({ raw: true });
    if (categoriesData.length == 0) {
      return await failMessage("Data not found");
    }
    const result = helper.getNestedChildren(categoriesData);
    return await successMessage("Data get succefully", result);
  } catch (error) {
    console.log(error);
  }
};
