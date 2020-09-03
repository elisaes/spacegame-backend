const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require("../config/config");

router.post("/register", async (req, res) => {
  console.log("heeeere register");
  console.log(req.body);
  let { name, email, password } = req.body;
  try {
    let user = new User({ name, email });

    //hash password before save
    let hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

    //save user
    await user.save();

    //201 - success and new data was added
    // res.status(201).json({ message: "user registered successfully!" });

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, "mamamia", { expiresIn: 360000000 }, (err, token) => {
      if (err) throw err; //if error go to catch

      res.status(201).json({ token, message: "user registered successfully!" });
    });
  } catch (error) {
    console.log(error);
    //   500 internal server error
    res
      .status(500)
      .json({ message: "oh no!!!  user not registered successfully!" });
  }
});
module.exports = router;
