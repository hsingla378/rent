const User = require("../models/User");

module.exports = async function (req, res, next) {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    console.log(user.isSeller);
    if (!user.isSeller) {
      return res
        .status(401)
        .json({ msg: "Unauthorized. Only sellers can perform this action." });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
