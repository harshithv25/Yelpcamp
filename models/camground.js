const mongoose = require("mongoose");
const AppErr = require("../utils/errClass");
const Schema = mongoose.Schema;
const Review = require("./review");

const CampgroundSchema = new Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

mongoose.set('useFindAndModify', false);

CampgroundSchema.post("findOneAndDelete", async function (campground) {
  if (campground) {
    await Review.deleteMany({ _id: { $in: campground.reviews } });
  } else {
    throw new AppErr("The campground you're trying to delete does not exist");
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
