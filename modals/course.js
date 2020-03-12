var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  name: String,
  link: String,
  image: String,
  type: String
});

module.exports = mongoose.model("Course", courseSchema);