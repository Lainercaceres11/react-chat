import { generateToken } from "../libs/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../libs/cloudinary-config.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).send("All fields are required");
    }

   if (password.length < 6) {
     return res.status(400).send("Password must be at least 6 characters");
   }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      profilePic: "",
    });

    if (user) {
      await generateToken(user._id, res);
      await user.save();

      return res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      });
    } else {
      return res.status(400).send("Invalid user data");
    }
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json("Internal server error");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).send("Invalid credentials");
    }

    await generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error login controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json("Logout successful");
  } catch (error) {
    console.log("Error logout controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).send("Profile picture is required");
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true },
    );

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error update profile controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};

export const checkUser = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error check user controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};
