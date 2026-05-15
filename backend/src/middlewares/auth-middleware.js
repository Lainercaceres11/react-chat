import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // Buscamos el token en las cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    // Verificamos si el token es valido
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json("Not token valid");
    }

    // Buscamos el usuario
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error auth middleware ", error.message);
    return res.status(500).json("Internal server error");
  }
};
