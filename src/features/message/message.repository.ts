import { Message } from "./message.model";

export const messageRepository = {
  create: (data: any) => Message.create(data),

  findByConversationId: (conversationId: string, limit = 50) =>
    Message.find({ conversationId }).sort({ createdAt: -1 }).limit(limit),
};
