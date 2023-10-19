const express = require("express");
const router = express();

var categoryController = require("../controller/categoryController/index");

/**
 * ADD CATEGORY
 */
router.post("/categories", async (req, res) => {
	try {
		var ctrlResponse = await categoryController.addCategory(req);
		res.send(ctrlResponse);
	} catch (err) {
		res.send(err);
	}
});
/**
 * UPDATE CATEGORY
 */
router.put("/categories/:categoryId", async (req, res) => {
	try {
		var ctrlResponse = await categoryController.updateCategory(req);
		res.send(ctrlResponse);
	} catch (err) {
		res.send(err);
	}
});
/**
 * DELETE CATEGORY
 */
router.delete("/categories/:categoryId", async (req, res) => {
	try {
		var ctrlResponse = await categoryController.deleteCategory(req);
		res.send(ctrlResponse);
	} catch (err) {
		res.send(err);
	}
});
/**
 * CATEGORY GET BY ID
 */
router.get("/categories/:categoryId", async (req, res) => {
	try {
		var ctrlResponse = await categoryController.getCategory(req);
		res.send(ctrlResponse);
	} catch (err) {
		res.send(err);
	}
});
/**
 * CATEGORY GET BY ID
 */
router.get("/", async (req, res) => {
	try {
		var ctrlResponse = await categoryController.getAllCategories(req);
		res.send(ctrlResponse);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
