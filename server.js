const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const cors = require("cors");
const dotenv = require("dotenv").config();
const Todo = require("./models/Todo");
const Notification = require("./models/Notification");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const workspaceRoutes = require("./routes/workspace");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "https://str4in.netlify.app"],
    credentials: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("database connected successfully.....");
}).catch((error) => {
    console.log(`database connection failed: ${error}`);
});

app.use("/user/", userRoutes);
app.use("/todo/", todoRoutes);
app.use("/workspace/", workspaceRoutes);

app.get("/notifications", async (req, res) => {
  let data = await Notification.find({is_seen: false}).populate("todo").sort([["date", -1]]).exec();
  res.json(data);
});

app.get("/notification_seen", async (req, res) => {
  await Notification.updateMany({is_seen: false}, {$set: { is_seen: true }});
    res.send("notifications seen");
});

schedule.scheduleJob("*/59 * * * *", async () => {
  let current_date = new Date().getTime();
  let data = await Todo.find({});
  data.map((todo) => {
    if(current_date >= new Date(todo.due_date).getTime()){
      Notification.findOne({todo: todo._id}, (error, cb_data) => {
        if(cb_data === null){
          Notification.create({todo: todo._id}).then((res) => {
            console.log(res);
          });
        }
      });
    }
  });
  await Notification.deleteMany({is_seen: true});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});