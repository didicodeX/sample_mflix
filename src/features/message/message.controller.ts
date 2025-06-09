import { FastifyReply, FastifyRequest } from "fastify";
import { messageService } from "./message.service";

export async function sendMessage(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as any;
  const userId = "68470719c985673dec9497f8"; // à remplacer par auth

  // 1. Sauvegarde dans la DB
  const message = await messageService.sendMessage({
    ...body,
    senderId: userId,
  });

  // 2. Émission temps réel via Socket.IO
  // 🔥 `req.server` te donne accès à `fastify`
  const io = req.server.io;
  io.to(String(message.conversationId)).emit("chat:message", message); // ✅ envoie juste aux clients de cette room

  // 3. Réponse HTTP
  reply.code(201).send(message);
}

export async function getMessages(req: FastifyRequest, reply: FastifyReply) {
  const { roomId } = req.params as { roomId: string };
  const messages = await messageService.getMessagesByRoom(roomId);
  reply.send(messages);
}
