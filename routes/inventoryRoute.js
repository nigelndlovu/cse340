const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by item detail view
router.get('/detail/:invId', invController.buildByInvId);

router.get('/trigger-error', (req, res, next) => {
  const error = new Error('This is an intentional 500 error.');
  error.status = 500;
  next(error);
});

router.get('/', invController.buildManagementView);

router.post(
  "/inv",
	invValidate.classificationRules(),
  (req, res) => {
    res.status(200).send('login process')
  }
)

router.get(
  "/inv/getInventory/:classification_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON)
)

module.exports = router;