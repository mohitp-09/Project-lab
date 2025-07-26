const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userAlready = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userAlready) {
      return res.status(409).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, name, email, password: hash });
    const { password: _pw, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "User created successfully.",
      user: safeUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const userSingIn = async () => {
  try {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }



  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { createUser };
