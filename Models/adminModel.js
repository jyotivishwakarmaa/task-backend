const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  Email: String,
  password: String,
});

module.exports = mongoose.model("admin", adminSchema);
