const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  place: { type: String, required: true },
  area: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  nearby: { type: String, required: true },
  description: { type: String },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Property", PropertySchema);
