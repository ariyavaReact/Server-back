var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user_traker_model = new Schema({
  user_name: {default:"" , type:String},
  city: {default:"" , type:String},
  email: {default:"" , type:String},
  country: {default:"" , type:String},
},{
  timestamps:true
});
module.exports= mongoose.model("USER_TRAKER", user_traker_model, "USER_TRAKER");
