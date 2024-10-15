const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by item detail view
router.get('/detail/:invId', invController.buildByInvId);

router.get('/trigger-error', (req, res, next) => {
  const error = new Error('This is an intentional 500 error.');
  error.status = 500;
  next(error);
});

module.exports = router;