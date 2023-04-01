let express = require("express");
let router = express.Router();
let common = require("../helpers/common");
let user_controller = require("../controller/user_controller");

router.post("/login", common.origincheck, user_controller.login);
router.post("/register", common.origincheck, user_controller.register);

module.exports = router;
