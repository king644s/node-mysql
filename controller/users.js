const User = require("../model/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();

module.exports.addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let hashedPass = await bcrypt.hash(password, saltRounds);
    let resQ = await User.build({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPass,
    });
    if (!resQ) {
      return res.status(400).json({ message: "Error" });
    }
    await resQ.save();
    return res.status(200).json({ messhae: "successfull !", res: resQ });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error!", error });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // let hashedPass = await bcrypt.hash(password, saltRounds)
    let resQ = await User.findOne({
      where: { email: email },
    });
    if (!resQ) {
      return res.status(400).json({ message: "Error Email" });
    }
    let comparePass = await bcrypt.compare(password, resQ.password);

    if (!comparePass) return res.status(403).json({ message: "Error pass" });

    var randString = Array(50)
      .fill(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`{}|[]<>?,./"
      )
      .map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join("");

    let token = jwt.sign({ string: randString }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });
    let tokenQuery = await User.update(
      {
        token: token,
      },
      {
        where: {
          email: resQ.email,
        },
        returning: true,
        plain: true,
      }
    );
    if (!tokenQuery)
      return res.status(400).json({ message: "token generation failed" });

    let findUser = await User.findOne({ where: { email: email } });
    return res
      .status(200)
      .json({ message: "Login successfull !", user: findUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error!", error });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (password) {
      let hashedPass = await bcrypt.hash(password, saltRounds);
      let resQ = await User.update(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPass,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (!resQ) {
        console.log(resQ);
        return res.status(400).json({ message: "Error" });
      }
      return res.status(200).json({ message: "successFull", res: resQ });
    }
    let resQ = await User.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!resQ) {
      console.log(resQ);
      return res.status(400).json({ message: "Error" });
    }
    return res.status(200).json({ message: "successFull", res: resQ });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error!", error });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    let resQ = await User.destroy({
      where: { id: req.params.id },
    });

    if (!resQ) {
      return res.status(400).json({ message: "Error" });
    }

    return res.status(200).json({ message: "user deleted !" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal error!", error });
  }
};
