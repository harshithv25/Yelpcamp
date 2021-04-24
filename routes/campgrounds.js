const express = require("express");
const router = express.Router();
const Campground = require("./models/camground");

router.get(
  "/",
  asyncErr(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds", { campgrounds });
  })
);

router.post(
  "/",
  validateCampground,
  asyncErr(async (req, res, next) => {
    const campground = new Campground(req.body.campgrounds);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get("/campgrounds/new", (req, res) => {
  res.render("newCamp");
});

router.get(
  "/:id",
  asyncErr(async (req, res) => {
    const id = req.params.id;
    const moreCamp = await Campground.findById(id).populate("reviews");
    res.render("show", { moreCamp });
  })
);

router.get(
  "/:id/edit",
  asyncErr(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("edit", { campground });
  })
);

router.put(
  "/:id",
  validateCampground,
  asyncErr(async (req, res) => {
    if (!req.body.campgrounds) throw new routerErr("Invalid Campground Data", 400);
    const campground = await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campgrounds,
    });
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:id",
  asyncErr(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

module.exports = router;
