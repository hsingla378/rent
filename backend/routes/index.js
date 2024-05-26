const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const propertyRoutes = require("./propertyRoutes");

router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);

module.exports = router;
