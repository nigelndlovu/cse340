const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}
const inventoryModel = require("../models/inventory-model")
const req = require("express/lib/request")

validate.classificationRules = () => {
	return [
		body("classification_name")
			.isAlphanumeric()
			.withMessage("Classification name must not contain spaces or special characters"),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				req.flash("notice", "Please fix the errors.");
				return res.status(400).render("inventory/add-classification", {
					title: "Add Classification",
					errors: errors.array(),
				});
			}
			next();
		},
	];
}

module.exports = validate