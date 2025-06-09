import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";

import mongodb from "./plugins/mongodb";
import socket from "./plugins/socket";
import registerRoutes from "./routes";

export default async function app(fastify: FastifyInstance) {
  // 1. Gérer CORS pour le frontend (React, etc.)
  await fastify.register(cors, {
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  // 2. Gérer les cookies
  await fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET,
  });

  // 3. Connexion MongoDB (plugin)
  await fastify.register(mongodb);

  // 4. Initialiser Socket.IO (plugin)
  await fastify.register(socket);

  // 5. Enregistrer toutes les routes de l'application
  registerRoutes(fastify);

  // Ajoute ça temporairement dans app.ts
  fastify.get("/", async () => {
    return { message: "API is working 🔥" };
  });
}
