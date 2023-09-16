const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    // check existing username
    const existingUser = await User.findOne({ username: username });

    if (existingUser)
      return res.status(409).json({ message: `Already signed in ${username}` });

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isCorrectPwd = await bcrypt.compare(password, user.password);

    if (isCorrectPwd)
      res.status(200).json({ message: "Logged in successfully" });
    else res.status(404).json({ message: "Username or password incorrect" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
