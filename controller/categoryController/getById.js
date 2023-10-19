let db = require("../../schema/db");
const categories = db.categories;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const helper = require("../../helpers/helper");
const { failMessage, successMessage } = require("../../response/response");
module.exports.getCategory = async (req, res) => {
  try {
    let categoryId = parseInt(req.params.categoryId);
    let dataArr = [];
    let result = await categories.findOne({
      where: { id: categoryId },
    });

    if (!result) {
      return await failMessage("Category data not found");
    }

    let data = await sequelize.query(`WITH RECURSIVE CategoryCTE AS (
    SELECT id, categoryName, parentCategoryId,description,createdAt,updatedAt
    FROM categories
    WHERE id = ${categoryId} 
    UNION ALL
    SELECT c.id, c.categoryName, c.parentCategoryId,c.description,c.createdAt,c.updatedAt
    FROM categories c
    JOIN CategoryCTE cte ON cte.id = c.parentCategoryId
    
)
SELECT * FROM CategoryCTE;`);

    const uniqueData = new Set();

    let responseData = data.filter((arr) => {
      const stringifiedArr = JSON.stringify(arr);
      const isUnique = !uniqueData.has(stringifiedArr);
      if (isUnique) {
        uniqueData.add(stringifiedArr);
      }
      return isUnique;
    });
    responseData = [].concat(...responseData);
    return await successMessage("Data get succefully", responseData);
  } catch (error) {
    console.log(error);
  }
};


