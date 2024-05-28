const express = require("express");
const router = express.Router();
const { propertyController } = require("../controllers");
const auth = require("../middleware/auth");
const checkSeller = require("../middleware/checkSeller");
const checkIfLiked = require("../middleware/checkIfLiked");
const checkOwnership = require("../middleware/checkOwnership");

// Get All Properties
router.get("/", propertyController.getAllProperties);

// Get Seller Properties
router.get(
  "/seller",
  auth,
  checkSeller,
  checkOwnership,
  propertyController.getSellerProperties
);

// Get Single Property
router.get("/:id", propertyController.getSingleProperty);


// Create Property
router.post("/", auth, checkSeller, propertyController.createProperty);

// Update Property
router.put(
  "/:id",
  auth,
  checkSeller,
  checkOwnership,
  propertyController.updateProperty
);

// Delete Property
router.delete(
  "/:id",
  auth,
  checkSeller,
  checkOwnership,
  propertyController.deleteProperty
);

// Like Property
router.post("/:id/like", auth, checkIfLiked, propertyController.likeProperty);

module.exports = router;

// // Seller Routes
// router.use(auth, checkSeller);

// // Get Seller Properties
// router.get("/seller", propertyController.getSellerProperties);

// // Create Property
// router.post("/", propertyController.createProperty);

// // Update Property
// router.put("/:id", checkOwnership, propertyController.updateProperty);

// // Delete Property
// router.delete("/:id", checkOwnership, propertyController.deleteProperty);

// // Like Property
// router.post("/:id/like", propertyController.likeProperty);
