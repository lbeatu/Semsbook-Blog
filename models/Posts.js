const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
  },
  filename: {
    type: String,
  },
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  country: {
    type: String,
  },
  context: {
    type: String,
  },
  creator: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("post", PostSchema);
