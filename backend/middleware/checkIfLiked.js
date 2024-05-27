const Property = require("../models/Property");

module.exports = async function (req, res, next) {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    if (property.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "User has already liked this property" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
