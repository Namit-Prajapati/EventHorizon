const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "No user with this email found!" });
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res
        .status(401)
        .json({ message: "wrong password" });
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
        department: loadedUser.department,
        role: loadedUser.role,
        name: loadedUser.name,
      },
      "somesecretstring"
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString(), department: loadedUser.department, role: loadedUser.role,name: loadedUser.name,email: loadedUser.email});
  } catch (err) {
    
    return res.status(500).json({message:"Server Error"});
  }
};
