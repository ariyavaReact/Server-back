let allowedOrigin = require("../config/origin");
let encrypt_decrypt = require("./encrypt_decrypt");

exports.origincheck = origincheck = (req, res, next) => {
  try {
    let origin = req.headers["origin"];
    let check = allowedOrigin.indexOf(origin);
    if (!check) next();
    else {
      res.json({
        status: false,
        message: "unauthorized request",
      });
    }
  } catch (e) {
    res.json({
      status: false,
      message: "Something went wrong !",
    });
  }
};
