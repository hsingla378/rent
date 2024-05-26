const express = require("express");
const router = express.Router();
const { propertyController } = require("../controllers");
const auth = require("../middleware/auth");
const checkSeller = require("../middleware/checkSeller");

// Get All Properties
router.get("/", propertyController.getAllProperties);

// Create Property
router.post("/", auth, checkSeller, propertyController.createProperty);

// Update Property
router.put("/:id", auth, checkSeller, propertyController.updateProperty);

// Delete Property
router.delete("/:id", auth, checkSeller, propertyController.deleteProperty);

module.exports = router;
