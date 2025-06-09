import { FastifyInstance } from "fastify";
import { verifyToken } from "./aut.middleware";
import { getMe, login, register } from "./auth.controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", register);
  fastify.post("/login", login);
  fastify.get("/me", { preHandler: verifyToken }, getMe);
}
