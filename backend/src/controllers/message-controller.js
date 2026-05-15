import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../libs/cloudinary-config.js";
import { io, getReceiverSocketId } from "../libs/socket.js";

export const userForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error user for sidebar controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};

export const getMessages = async (req, res) => {
  const { id: userChatId } = req.params;
  try {
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receivedId: userChatId },
        { senderId: userChatId, receivedId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error user for message controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};

export const sendMessages = async (req, res) => {
  const { text, image } = req.body;
  const { id: receivedId } = req.params;
  try {
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMesage = await Message.create({
      senderId,
      receivedId,
      text,
      image: imageUrl,
    });

    await newMesage.save();

    const receidvedUserId = getReceiverSocketId(receivedId);
    if (receidvedUserId) {
      io.to(receidvedUserId).emit("newMessage", newMesage);
    }

    return res.status(200).json(newMesage);
  } catch (error) {
    console.log("Error sender message controller ", error.message);
    return res.status(500).json("Internal server error");
  }
};
