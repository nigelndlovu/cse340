const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')
const logValidate = require('../utilities/account-validation')
//const roleCheck = require('../middleware/authMiddleware')
const { ensureAuthenticated } = require("../server");

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// Route to deliver the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Route to deliver the management view
router.get("/account/", ensureAuthenticated, utilities.handleErrors(accountController.buildManagement))
// Route to enable processing of registration 
router.post('/register', 
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
	logValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;