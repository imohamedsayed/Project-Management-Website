const jwt = require("jsonwebtoken");
const User = require("../models/User");
const settings_get = (req, res) => {
  res.render("settings", { title: "Settings" });
};

const edit_name = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;

  try {
    const new_name = req.body.name;
    const user = await User.findByIdAndUpdate(id, {
      name: new_name,
    });

    res.status(200).json({ message: "Name Updated Successfully" });
  } catch (err) {
    res.status(400).json({ err });
  }
};
const edit_email = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;

  try {
    const new_email = req.body.email;

    const user = await User.findByIdAndUpdate(id, {
      email: new_email,
    });

    res.status(200).json({ message: "Email Updated Successfully" });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const edit_password = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {

    const user = await User.changePassword(
      id,
      req.body.old_password,
      req.body.new_password
    );
    console.log(user);
    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

module.exports = { settings_get, edit_name, edit_email, edit_password };
