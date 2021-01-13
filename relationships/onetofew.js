const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Yelp-Camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("Database Connected....");
});
