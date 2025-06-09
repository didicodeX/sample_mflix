import { FastifyInstance } from "fastify";
import { verifyToken } from "../auth/aut.middleware";
import {
  createConversation,
  getMyConversations,
} from "./conversation.controller";

export default async function conversationRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", verifyToken); 
  fastify.post("/", createConversation);
  fastify.get("/mine", getMyConversations);
}

//fastify.get("/", { preHandler: verifyToken }, conversationController.list);

