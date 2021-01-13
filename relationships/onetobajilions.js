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

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweet = async () => {
//   //   const user = new User({ username: "(*_*)", age: 20 });
//   const user = await User.findOne({ username: "(*_*)" });
//   const tweet2 = new Tweet({ text: "Whitehat jr. sucks", likes: 1111111111111 });
//   tweet2.user = user;
//   await tweet2.save();
//   console.log("done");
// };

// makeTweet();

const findtweet = async () => {
  const t = await Tweet.find({}).populate("user", "username");
  console.log(t);
};

findtweet();
