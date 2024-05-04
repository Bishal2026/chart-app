import { Conversation } from "../models/coversection.modles.js";
import { Message } from "../models/messge.modles.js";
import { getReciverSocketId, io } from "../sockets/socket.js";
export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;

    const { message } = req.body;

    let gotCoverstion = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!gotCoverstion) {
      gotCoverstion = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMeassge = await Message.create({
      senderId,
      reciverId,
      message,
    });

    if (newMeassge) {
      gotCoverstion.messages.push(newMeassge._id);
    }

    await Promise.all([gotCoverstion.save(), newMeassge.save()]);

    const reciverSocketId = getReciverSocketId(reciverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMeassge);
    }

    return res.status(200).json({
      newMeassge,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const reciverId = req.params.id;
    const senderId = req.id;

    const coverstion = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).populate("messages");
    // console.log(coverstion);
    return res.status(200).json(coverstion?.messages);
  } catch (error) {
    console.log(error);
  }
};
