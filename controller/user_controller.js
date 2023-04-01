let { Validator } = require("node-input-validator");
let common = require("../helpers/common");
let encrypt_decrypt = require("../helpers/encrypt_decrypt");
let user = require("../model/user_model");
const ipInfo = require("ipinfo")

exports.login = (req, res) => {
  try {
    const v = new Validator(req.body, {
      email: "required",
      password: "required",
    });
    v.check().then(async (matched) => {
      if (!matched) {
        res.json({
          status: false,
          message: "Please fill required fields",
        });
      } else {
        let info = req.body;
        let email = info.email;
        let userData = await user.findOne({ email });

        ipInfo((err, cLoc) => {
          if (userData) {
            if (encrypt_decrypt.decrypt(userData.password) == info.password) {
              return res.json({
                status: true,
                data: userData,
                ip: cLoc && cLoc.ip,
                email: req.body.email,
                message: "Login Successfully !!"
              })
            } else {
              return res.json({
                status: false,
                message: "Invalid Password !!"
              })
            }
          } else {
            return res.json({
              status: false,
              message: "Invalid Login Details !"
            })
          }
        })
      }
    });
  } catch (e) {
    return res.json({
      status: false,
      message: "Something went wrong !",
    });
  }
};

exports.register = (req, res) => {
  try {
    const v = new Validator(req.body, {
      first_name: "required",
      last_name: "required",
      email: "required",
      password: "required",
    });
    v.check().then(async (matched) => {
      if (!matched) {
        res.json({
          status: false,
          message: "Please fill required fields",
        });
        res.end();
      } else {
        let info = req.body;
        let email = info.email;
        const findData = await user.findOne({ email: email })
        if (findData) {
          res.json({
            status: false,
            message: "User Already Exists !!",
          });
          res.end();
        } else {
          let obj = {
            first_name: encrypt_decrypt.encrypt(info.first_name),
            last_name: encrypt_decrypt.encrypt(info.last_name),
            email: info.email,
            password: encrypt_decrypt.encrypt(info.password),
          };
          const createData = await user.create(obj)
          if (createData) {
            return res.json({
              status: true,
              message: "User Register Successfully!!",
            });
          } else {
            return res.json({
              status: false,
              message: "Something went wrong, can't able to register user",
            });
          }

        }

      }
    });
  } catch (e) {
    return res.json({
      status: false,
      message: "Something went wrong !",
    });
  }
};
