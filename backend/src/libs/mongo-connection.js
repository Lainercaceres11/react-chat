import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongoConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected ${connection.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error", error);

    process.exit(1);
  }
};
