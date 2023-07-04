const mongoose = require("mongoose");
const UserSchema = require("../models/auth-model");
const bcrypt = require("bcrypt");
const email_regex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// handle post new user
const handleRegistration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "please fill in all details!" });
  } else if (!email_regex.test(email)) {
    return res.status(400).json({ msg: "not a valid email address" });
  } else {
    try {
      // creating a new user from the instamce of the UserSchema
      const userDetails = new UserSchema({
        firstName,
        lastName,
        email,
        password,
      });
      // going to the UserSchema and checking if the email entered is already existing
      const users = await UserSchema.findOne({ email });
      if (users) {
        return res.status(400).json({ msg: "Email Already Exist" });
      } else {
        const salt = await bcrypt.genSalt(10);
        userDetails.password = await bcrypt.hash(password, salt);
        await userDetails.save();
        return res.status(201).json(userDetails);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  }
};

// handleLogin
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "please fill in all details!" });
  } else if (!email_regex.test(email)) {
    return res.status(400).json({ msg: "not a valid email address" });
  } else {
    try {
      const users = await UserSchema.findOne({ email });
      if (!users) {
        return res.status(400).json({ msg: "Login credentials not valid" });
      } else if (users && (await bcrypt.compare(password, users.password))) {
        return res.status(200).json(users);
      } else {
        return res.status(400).json({ msg: "Login credentials not valid" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  }
};

//
module.exports = { handleRegistration, handleLogin };
