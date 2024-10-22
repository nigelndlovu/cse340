const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Route to deliver the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));
// Route to enable processing of registration 
router.post('/register', 
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;