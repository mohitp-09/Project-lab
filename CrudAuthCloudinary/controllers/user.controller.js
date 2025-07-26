const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user create controller
const createUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userByEmail = await User.findOne({ email });
    const userByUsername = await User.findOne({ username });

    const userAlready = userByEmail || userByUsername;

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

// sign in controller
const userSignIn = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res
        .status(400)
        .json({ message: "Password and (username or email) are required." });
    }

    const user = await User.findOne(
      username ? { username } : { email: email.toLowerCase() }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const { password: _pw, ...safeUser } = user.toObject();
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET
    );
     res.cookie('token', token, {
        httpOnly: true,
    });
    return res.status(200).json({
      message: "Logged in successfully.",
      user: safeUser,
      jwt_token: token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};


//logout
const userLogout = async (req, res)=>{
    try {
        res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = { createUser, userSignIn, userLogout };
