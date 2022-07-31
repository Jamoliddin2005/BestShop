const Users = require("../models/User");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

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
    const hash = await bcrypt.hash(req.body.password, 10);
    if (req.body.phoneNumber === "+998942245606") {
      const phone = new Users({
        googleId: v4(),
        phoneNumber: req.body.phoneNumber,
        password: hash,
        isAdmin: true
      });
      await phone.save();
      req.session.user = phone;
      await req.session.save();
      return res.status(202).json({ success: true, data: phone });
    } else {
      const phone = new Users({
        googleId: v4(),
        phoneNumber: req.body.phoneNumber,
        password: hash,
      });
      await phone.save();
      req.session.user = phone;
      await req.session.save();
      return res.status(202).json({ success: true, data: phone });
    }


  } catch (error) {
    return res.status(400).json("ERROR: " + error);
  }
};

exports.PostPasswordSubmit = async (req, res) => {
  const user = await Users.findOne({ phoneNumber: req.body.phoneNumber });
  const bcCompare = await bcrypt.compare(req.body.password, user.password);
  if (!bcCompare) {
    return res.status(200).json({ success: false, data: "ERROR" });
  }
  req.session.user = user;
  await req.session.save();
  return res.status(200).json({ success: true, data: req.session });
};
