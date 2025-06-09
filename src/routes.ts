import { FastifyInstance } from "fastify";
import { authRoutes } from "features/auth/aut.routes";
import conversationRoutes from "features/conversation/conversation.routes";
import messageRoutes from "features/message/message.routes";
import userRoutes from "features/user/user.routes";

export default function registerRoutes(fastify: FastifyInstance) {
  fastify.register(conversationRoutes, { prefix: "/conversations" });
  fastify.register(messageRoutes, { prefix: "/messages" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(authRoutes, { prefix: "/auth" });
}
