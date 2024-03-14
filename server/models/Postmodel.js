const mongoose = require("mongoose");

//schema building
const Postschema = new mongoose.Schema({
  title: String,
  description: String,
  file: String,
  email: String,
});

//create model
const Postmodel = mongoose.model("post", Postschema);

module.exports = Postmodel;
