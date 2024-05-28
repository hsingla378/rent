const express = require("express");
const router = express.Router();
const { propertyController } = require("../controllers");
const auth = require("../middleware/auth");
const checkSeller = require("../middleware/checkSeller");
const checkIfLiked = require("../middleware/checkIfLiked");

// Get All Properties
router.get("/", propertyController.getAllProperties);

// Get Single Property
router.get("/:id", propertyController.getSingleProperty);

// Create Property
router.post("/", auth, checkSeller, propertyController.createProperty);

// Update Property
router.put("/:id", auth, checkSeller, propertyController.updateProperty);

// Delete Property
router.delete("/:id", auth, checkSeller, propertyController.deleteProperty);

// Like Property
router.post("/:id/like", auth, checkIfLiked, propertyController.likeProperty);

module.exports = router;
