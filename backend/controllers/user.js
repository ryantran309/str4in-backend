const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  let { first_name, last_name, gender, email, password, avatar } = req.body;
  email.toLowerCase();
  const user = await User.findOne({ email: email });
  if (user) {
    return res.json({ status: "failed", msg: "user already exist!" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.create({
      first_name,
      last_name,
      gender,
      email,
      password: hash,
      avatar,
    });
    return res.json({ status: "success", msg: "user registered successfully" });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  email.toLowerCase();
  const user = await User.findOne({ email: email });
  if (user) {
    const is_match = await bcrypt.compare(password, user.password);
    if (is_match) {
      const jwt_token = await jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({ status: "success", token: jwt_token });
    } else {
      return res.json({ status: "failed", msg: "password don't match!" });
    }
  } else {
    return res.json({ status: "failed", msg: "user doesn't exist!" });
  }
};

const getUserName = async (req, res) => {
  const token = req.body.token;
  const id = await jwt.verify(token, process.env.JWT_SECRET).id;
  const data = await User.findById(id);
  return await res.json({
    name: data.first_name + " " + data.last_name,
    avatar: data.avatar,
  });
};

const getAvatar = async (req, res) => {
  const token = req.body.token;
  const id = await jwt.verify(token, process.env.JWT_SECRET).id;
  const data = await User.findById(id);
  return await res.json({ avatar: data.avatar });
};

const user_data = async (req, res) => {
  const token = req.body.token;
  const id = await jwt.verify(token, process.env.JWT_SECRET).id;
  const data = await User.findById(id);
  return await res.json(data);
};

const user_update = async (req, res) => {
  const { id, first_name, last_name, email, gender, avatar } = req.body;
  await User.findByIdAndUpdate(id, {
    first_name,
    last_name,
    email,
    gender,
    avatar,
  });
  return res.json({ status: "success", msg: "user info has been updated" });
};

const password_modifier = async (req, res) => {
  const { id, oldPassword, password } = req.body;
  let user = await User.findById(id);
  const is_match = await bcrypt.compare(oldPassword, user.password);
  if (is_match) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(id, { password: hash });
    return res.json({ status: "success", msg: "user info has been updated" });
  } else {
    return res.json({ status: "failed", msg: "old password doesn't match!" });
  }
};

const getAssigneeName = async (req, res) => {
  const id = req.body.id;
  const data = await User.findById(id);
  return res.json({ name: data.first_name + " " + data.last_name });
};

module.exports = {
  register,
  login,
  getUserName,
  getAvatar,
  user_data,
  user_update,
  password_modifier,
  getAssigneeName,
};
