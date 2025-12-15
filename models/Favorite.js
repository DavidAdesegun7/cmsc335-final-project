const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  city: { type: String, required: true, trim: true },
  region: { type: String, default: "" },
  country: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Favorite", favoriteSchema);