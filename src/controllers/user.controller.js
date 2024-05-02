import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: " All fields is required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password not match" });
    }

    const userexits = await User.findOne({ username });
    if (userexits) {
      return res.status(400).json({ message: "username allready exits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const maleProfilephoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const femaleProfilephoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = await User.create({
      fullName,
      username,
      password: hashPassword,
      confirmPassword,
      profilePhoto: gender === "male" ? maleProfilephoto : femaleProfilephoto,
      gender,
    });

    await user.save();
    return res.status(200).json({
      success: true,
      messsage: " user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: " All fields is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "username not exits" });
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({ message: "password not exits" });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        messsage: " user login successfully",
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        success: true,
        messsage: " user loggout successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

export const getOtheruser = async (req, res, next) => {
  try {
    const loggedInuserId = req.id;
    // console.log(loggedInuserId._id);
    const otherUsers = await User.find({ _id: { $ne: loggedInuserId } }).select(
      "-password"
    );
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};
