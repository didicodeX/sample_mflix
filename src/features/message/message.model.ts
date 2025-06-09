import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  files: [String],
  createdAt: { type: Date, default: Date.now }
})

export const Message = mongoose.model('Message', messageSchema)

export type Message = {
  _id: string
  conversationId: string
  senderId: string
  text?: string
  files?: string[]
  createdAt: Date
}