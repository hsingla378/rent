const Property = require("../models/Property");

module.exports = async function (req, res, next) {
  //   console.log("in checkouwner", req.user);
  try {
    const property = await Property.findOne({ userId: req.user.id });
    // console.log("property", property)

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    if (property.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Unauthorized. You do not own this property." });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
