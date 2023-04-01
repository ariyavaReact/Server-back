let mongoose = require("mongoose");
const config = require("./development");
let encrypt_decrypt = require("../helpers/encrypt_decrypt");
const DB = encrypt_decrypt.decrypt(config.Db)

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB is successfully connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:" + err);
  });
