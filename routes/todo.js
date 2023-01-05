const router = require("express").Router();
const {workspace_todos, get_todo, add_todo, update_todo_title, update_todo_description, status_dnd, delete_todo, search_todo, due_date_changer} = require("../controllers/todo");

router.get("/workspace_todos", workspace_todos);
router.get("/get_todo", get_todo);
router.post("/add_todo", add_todo);
router.post("/update_todo_title", update_todo_title);
router.post("/update_todo_description", update_todo_description);
router.post("/status_dnd", status_dnd);
router.post("/delete_todo", delete_todo);
router.get("/search_todo", search_todo);
router.post("/due_date_changer", due_date_changer);

module.exports = router;