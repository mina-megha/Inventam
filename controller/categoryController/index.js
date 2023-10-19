const { addCategory } = require("./addCategory");
const { updateCategory } = require("./updateCategory");
const { deleteCategory } = require("./deteleCategory");
const { getCategory } = require("./getById");
const { getAllCategories } = require("./getAllCategoryList");

module.exports = {
	addCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	getAllCategories,
};
