const Workspace = require("../models/Workspace");

const all_workspace = (req, res) => {
    Workspace.find({}).sort([["date", -1]]).exec((error, data) => {
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

const last_workspace = (req, res) => {
    Workspace.findOne().sort([["date", -1]]).exec((error, data) => {
        if(error){
            return res.json({status: "failed", msg: error});
        }
        if(data){
            return res.json({status: "success", data: data._id});
        }else{
            return res.json({status: "failed", msg: "no data found!"});
        }
    });
}

const add_workspace = (req, res) => {
    const name = req.body.name;
    let colors = [
        "#009900",
        "#7fec83",
        "#5046e5",
        "#f24c4c",
        "#ffc93c",
        "#12eefc",
        "#f674f9",
        "#660033",
        "#ff0066",
        "#66ff33",
        "#0099ff",
        "#66ffff",
        "#ff9900"
    ];
    let color_picker = colors[Math.floor(Math.random() * colors.length)];

    Workspace.create({name: name, color: color_picker}).then((data) => {
        return res.json({status: "success", msg: data});
    }).catch((error) => {
        return res.json({status: "failed", msg: error});
    });
}

module.exports = {
    all_workspace,
    last_workspace,
    add_workspace
}