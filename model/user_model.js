var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user_schema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  created_date: { type: Date, default: Date.now },
});
module.exports= mongoose.model("USER", user_schema, "USER");
