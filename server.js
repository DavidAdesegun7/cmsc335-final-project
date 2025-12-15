require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const weatherRouter = require("./routes/weather");
const favoritesRouter = require("./routes/favorites");

const app = express();

// middleware (forms + static css)
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// routes (Router requirement)
app.use("/", weatherRouter);
app.use("/", favoritesRouter);

// connect to mongo, then start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err.message);
  });