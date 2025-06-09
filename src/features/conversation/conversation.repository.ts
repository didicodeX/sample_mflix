import { Conversation } from "./conversation.model";

export const conversationRepository = {
  create: (data: any) => Conversation.create(data),
  findAllByUserId: (userId: string) =>
    Conversation.find({ participants: userId }).sort({ createdAt: -1 }),
};
