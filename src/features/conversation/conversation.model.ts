import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  name: { type: String },
  isGroup: { type: Boolean },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
