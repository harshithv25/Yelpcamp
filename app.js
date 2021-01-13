const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const Campground = require("./models/camground");
const Review = require("./models/review");
const asyncErr = require("./utils/asyncHandler");
const AppErr = require("./utils/errClass");
// const campgroundRoutes = require('./routes/campgrounds');
// const reviewsRoutes = require('./routes/reviews');
const { campgroundSchema, reviewSchema } = require("./schemas");

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

app.engine("ejs", engine);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// app.use('/campgrounds', campgroundRoutes)
// app.use('/campgrounds/:id', reviewsRoutes)

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((err) => err.message).join();
    throw new AppErr(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((err) => err.message).join();
    throw new AppErr(msg, 400);
  } else {
    next();
  }
};

app.get(
  "/",
  asyncErr(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds", { campgrounds });
  })
);

app.get(
  "/campgrounds",
  asyncErr(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds", { campgrounds });
  })
);

app.post(
  "/campgrounds",
  validateCampground,
  asyncErr(async (req, res, next) => {
    const campground = new Campground(req.body.campgrounds);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("newCamp");
});

app.get(
  "/campgrounds/:id",
  asyncErr(async (req, res) => {
    const id = req.params.id;
    const moreCamp = await Campground.findById(id).populate("reviews");
    res.render("show", { moreCamp });
  })
);

app.get(
  "/campgrounds/:id/edit",
  asyncErr(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  validateCampground,
  asyncErr(async (req, res) => {
    if (!req.body.campgrounds) throw new AppErr("Invalid Campground Data", 400);
    const campground = await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campgrounds,
    });
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  asyncErr(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  asyncErr(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.campground = campground;
    await campground.save();
    await review.save();
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

app.delete(
  "/campgrounds/:id/reviews/:reviewId",
  asyncErr(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    await campground.save();
    res.redirect(`/campgrounds/${id}`);
  })
);

app.all("*", (req, res, next) => {
  throw new AppErr("Page not found", 404);
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oops! Something went wrong";
  if (!err.status) err.status = 500;
  res.status(status).render("error", { err });
});

app.listen(5555, () => {
  console.log("Server Started.....");
});
