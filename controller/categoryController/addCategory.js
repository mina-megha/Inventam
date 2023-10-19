const db = require("../../schema/db");
const categories = db.categories;
const { categoryResponse } = require("../../response/categoryResponseModel");
const {
  failMessage,
  successCreateMessage,
} = require("../../response/response");
module.exports.addCategory = async (req, res) => {
  try {
    const requiredFields = ["categoryName", "isMainCategory"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return await failMessage(`Please provide ${field}`);
      }
    }
    if (req.body.isMainCategory != 1 && req.body.isMainCategory != 2) {
      return await failMessage("Please provide 1 Or 2 for Maincategory");
    }

    if (req.body.isMainCategory == 1) {
      if (typeof req.body.parentCategoryId == "undefined") {
        return await failMessage("Please provide parentCategoryId");
      }

      if (typeof req.body.parentCategoryId !== "number") {
        return await failMessage("Please provide valid parent_category_id");
      }

      let parentCategoryExists = await categories.findOne({
        where: { id: req.body.parentCategoryId },
      });

      if (!parentCategoryExists) {
        return await failMessage("parentCategoryId not found");
      }
    }

    let categoryNameExists = await categories.findOne({
      where: { categoryName: req.body.categoryName },
    });
    if (categoryNameExists) {
      return await failMessage("categoryName already exists");
    }

    let insertObj = {
      categoryName: req.body.categoryName,
      parentCategoryId:
        req.body.isMainCategory == 1 ? req.body.parentCategoryId : "",
      description: req.body.description,
    };

    let data = await categories.create(insertObj);

    let responseData = await categoryResponse(data.id);
    return await successCreateMessage("Data inserted succefully", responseData);
  } catch (error) {
    console.log(error);
  }
};
