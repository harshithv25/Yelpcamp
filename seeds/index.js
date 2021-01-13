const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("../models/camground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose.connect("mongodb://localhost:27017/Yelp-Camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("Database Connected");
});

const finder = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (var i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 55);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${finder(descriptors)} ${finder(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem consequatur consequuntur, aliquid facere a cupiditate quia officia debitis accusantium accusamus dignissimos eius eaque qui cum aut libero. Dicta, sunt soluta.",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
