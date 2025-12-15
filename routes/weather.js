const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/weather", async (req, res) => {
  const city = (req.body.city || "").trim();
  if (!city) return res.render("error", { message: "Please enter a city." });

  try {
    const url = "https://api.weatherapi.com/v1/current.json";
    const response = await axios.get(url, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
        aqi: "no",
      },
    });

    const data = response.data;
    res.render("weather", { data });
  } catch (err) {
    res.render("error", { message: "Could not fetch weather for that city. Try another." });
  }
});

module.exports = router;