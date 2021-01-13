const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  campgrounds: Joi.object({
    title: Joi.string().required().max(30).min(5),
    location: Joi.string().required().max(30),
    price: Joi.number().required().min(0),
    image: Joi.string().required().min(25),
    description: Joi.string().required().max(100).min(10),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required().max(100).min(10),
  }).required(),
});
