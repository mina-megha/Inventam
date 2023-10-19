let db = require("../../schema/db");
let categories = db.categories;
const Sequelize = db.Sequelize;
var { categoryResponse } = require("../../response/categoryResponseModel");
const { failMessage, successMessage } = require("../../response/response");
module.exports.updateCategory = async (req, res) => {
  try {
    let categoryId = parseInt(req.params.categoryId);

    let categoryExists = await categories.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!categoryExists) {
      return await failMessage("Category data not found");
    }
    let categoryNameExists = await categories.findOne({
      where: {
        categoryName: req.body.categoryName,
        id: { [Sequelize.Op.ne]: categoryId },
      },
    });
    if (categoryNameExists) {
      return await failMessage("Category Name already exists");
    }

    let updateObj = {
      categoryName: req.body.categoryName
        ? req.body.categoryName
        : categoryExists.categoryName,
      description: req.body.description
        ? req.body.description
        : categoryExists.description,
    };

    await categories.update(updateObj, { where: { id: categoryId } });
    let responseData = await categoryResponse(categoryId);
    return { msg: "Data updated succefully", data: responseData };
  } catch (error) {
    return await failMessage("Internal server error", 500);
  }
};
