const Users = require("../models/User");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const token = require('../controllers/token')

exports.usersGet = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res
        .status(200)
        .json({ success: true, message: "Users not found!" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(400).json({ success: false, message: "ERROR: " + error });
  }
};

exports.userFind = async (req, res) => {
  const users = await Users.find({ phoneNumber: req.body.phoneNumber });
  if (users.length === 0) {
    return res.status(200).json({ success: true, data: true });
  } else {
    return res.status(200).json({ success: true, data: false });
  }
};

exports.NumberAuth = async (req, res) => {
  try {
    const { password } = req.body
    const hash = await bcrypt.hash(password, 10);
    if (req.body.phoneNumber === process.env.AdminPhoneNumber) {
      const phone = new Users({
        googleId: v4(),
        phoneNumber: req.body.phoneNumber,
        password: hash,
        isAdmin: true
      });
      await phone.save();
      const user = await token.generateToken({ phone, password });
      return res.status(202).json({ success: true, data: user, });
    } else {
      const phone = new Users({
        googleId: v4(),
        phoneNumber: req.body.phoneNumber,
        password: hash,
      });
      await phone.save();
      const user = await token.generateToken({ phone, password });
      return res.status(202).json({ success: true, data: user });
    }
  } catch (error) {
    return res.status(400).json("ERROR: " + error);
  }
};

exports.PostPasswordSubmit = async (req, res) => {
  const { phoneNumber } = req.body
  const user = await Users.findOne({ phoneNumber: phoneNumber });
  if (user) {
    const bcCompare = await bcrypt.compare(req.body.password, user.password);
    if (!bcCompare) {
      return res.status(200).json({ success: false, data: "ERROR" });
    }
    const userToken = await token.generateToken({ user, phoneNumber });

    return res.status(200).json({ success: true, data: userToken });
  } else {
    return res.status(400).json({ success: false, message: "Foydalanuvchi topilmadi" })
  }

};
