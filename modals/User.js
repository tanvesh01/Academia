var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Course = require("./course");
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
