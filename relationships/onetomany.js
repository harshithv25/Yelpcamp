const app = require("express")();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/relationships", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("Database Connected....");
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   { name: "Apple", price: "10", season: "Winter" },
//   { name: "Mango", price: "12", season: "Summer" },
//   { name: "Bananas", price: "14", season: "Spring" },
// ]);

// const makefarm = async () => {
//   const farm = new Farm({ name: "The Rich Poor Farm", city: "Banglore, India" });
//   const product = await Product.findOne({ name: "Apple" });
//   farm.products.push(product);
//   await farm.save();
//   console.log(farm);
// };

// makefarm();

// const addProduct = async () => {
//   const farm = await Farm.findOne({ name: "The Rich Poor Farm" });
//   const fruit = await Product.findOne({ name: "Mango" });
//   farm.products.push(fruit);
//   await farm.save();
//   console.log(farm);
// };

// addProduct();

Farm.findOne({ name: "The Rich Poor Farm" })
  .populate("products")
  .then((farm) => console.log(farm));
