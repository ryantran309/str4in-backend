const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const Notification = require("../models/Notification");

const workspace_todos = (req, res) => {
    const {status, workspace} = req.query;
    Todo.find({status, workspace}).populate("assignee").exec((error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            return res.json({status: "success", data: data});
        }else{
            return res.json({status: "failed", msg: "no data found!"});
        }
    });
}

const get_todo = (req, res) => {
    const id = req.body.id;
    Todo.findById(id).populate("assignee").exec((error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            return res.json({status: "success", data: data});
        }else{
            return res.json({status: "failed", msg: "no data found!"});
        }
    });
}

const add_todo = (req, res) => {
    const {title, description, assignee, status, workspace} = req.body;
    const id = jwt.verify(assignee, process.env.JWT_SECRET).id;
    Todo.create({title, description, assignee: id, status, workspace}).then((data) => {
        return res.json({status: "success", msg: data});
    }).catch((error) => {
        return res.json({status: "failed", msg: error});
    });
}

const update_todo_title = (req, res) => {
    const {id, title} = req.body;
    Todo.findByIdAndUpdate(id, {title}, (error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            return res.json({status: "success", data: data});
        }else{
            return res.json({status: "failed", msg: "no data found!"});
        }
    });
}
const update_todo_description = (req, res) => {
    const {id, description} = req.body;
    Todo.findByIdAndUpdate(id, {description}, (error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            return res.json({status: "success", data: data});
        }else{
            return res.json({status: "failed", msg: "no data found!"});
        }
    });
}

const status_dnd = (req, res) => {
    const {id, status} = req.body;
    Todo.findByIdAndUpdate(id, {status}, (error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            return res.json({status: "success", data: data});
        }else{
            return res.json({status: "failed", msg: "no data found!"});
        }
    });
}

const delete_todo = (req, res) => {
    const id = req.body.id;
    Todo.findByIdAndRemove(id, (error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            Notification.deleteMany({todo: id}).then((done) => {
                return res.json({status: "success", data: "todo deleted... also notifications related to this todo"});
            });
        }else{
            return res.json({status: "failed", msg: "no data found to remove!"});
        }
    });
}

const search_todo = async (req, res) => {
    let query = req.query.query;
    let is_found = await Todo.find({title: new RegExp(query, "i")}).limit(10);
    if(is_found.length > 0){
        return res.json({status: "success", data: is_found});
    }else{
        return res.json({status: "failed", msg: "no query found!"});
    }
}

const due_date_changer = async (req, res) => {
    const id = req.body.id;
    let due_date = req.body.due_date;
    const new_date = due_date.split("-")[1]+"/"+due_date.split("-")[2]+"/"+due_date.split("-")[0];
    await Todo.findByIdAndUpdate(id, {due_date: new_date});
    res.json({status: "success", msg: "due_date has been updated"});
}

module.exports = {
    workspace_todos,
    get_todo,
    add_todo,
    update_todo_title,
    update_todo_description,
    status_dnd,
    delete_todo,
    search_todo,
    due_date_changer
}