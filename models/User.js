const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "https://image.flaticon.com/icons/svg/149/149071.svg"
  }
});

module.exports = User = mongoose.model("name", UserSchema, "users");
