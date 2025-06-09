import { FastifyReply, FastifyRequest } from "fastify";
import { conversationService } from "./conversation.service";

export async function createConversation(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = req.body as any;
  const userId = req.user._id; // remplace avec req.user.id si auth
  const conversation = await conversationService.createConversation({
    ...body,
    createdBy: userId,
    participants: Array.from(new Set([...body.participants, userId])),
  });
  reply.code(201).send(conversation);
}

export async function getMyConversations(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const userId = req.user._id;
  console.log("user : ", req.user, "userId : ", userId);

  const conversations = await conversationService.getUserConversations(userId);
  reply.send(conversations);
}
