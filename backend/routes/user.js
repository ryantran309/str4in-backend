const router = require("express").Router();
const {register, login, user_data, user_update, password_modifier} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.post("/user_data", user_data);
router.post("/user_update", user_update);
router.post("/password_modifier", password_modifier);

module.exports = router;