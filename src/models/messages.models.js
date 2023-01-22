import mongoose from "mongoose";

const schema = new mongoose.Schema({});

export const MessagesModel = mongoose.model("Messages", schema);
