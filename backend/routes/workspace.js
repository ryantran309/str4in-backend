const router = require("express").Router();
const {all_workspace, last_workspace, add_workspace} = require("../controllers/workspace");

router.get("/all_workspace", all_workspace);
router.get("/last_workspace", last_workspace);
router.post("/add_workspace", add_workspace);

module.exports = router;