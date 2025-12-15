const express = require("express");
const Favorite = require("../models/Favorite");

const router = express.Router();

router.post("/favorites", async (req, res) => {
  const city = (req.body.city || "").trim();
  const region = (req.body.region || "").trim();
  const country = (req.body.country || "").trim();

  if (!city) return res.redirect("/");

  await Favorite.create({ city, region, country });
  res.redirect("/favorites");
});

router.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find().sort({ createdAt: -1 });
  res.render("favorites", { favorites });
});

router.post("/favorites/:id/delete", async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.redirect("/favorites");
});

module.exports = router;