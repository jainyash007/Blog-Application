const mongoose = require("mongoose");

//schema building
const Userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

//create model
const Usermodel = mongoose.model("users", Userschema);

module.exports = Usermodel;
