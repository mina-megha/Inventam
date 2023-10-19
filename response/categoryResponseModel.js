let db = require("../schema/db");
const categories = db.categories;

const categoryResponse = async (id) => {
  let data = await categories.findOne({ where: { id: id } });
  let responseObj = {
    id: data.id,
    categoryName: data.categoryName,
    parentCategoryId: data.parentCategoryId,
    description:data.description,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  return responseObj;
};

function flattenCategories(categories, result = []) {
  for (const category of categories) {
    const { subCategory, ...categoryWithoutSubCategories } = category;
    result.push(categoryWithoutSubCategories);
    if (subCategory) {
      flattenCategories(subCategory, result);
    }
  }
  return result;
}

module.exports = { categoryResponse, flattenCategories };
