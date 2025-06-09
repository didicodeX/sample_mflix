// src/server.ts

import "dotenv/config";
import Fastify from "fastify";
import app from "./app";

// 🚀 Point d'entrée principal
async function startServer() {
  // 1. Créer une instance Fastify
  const fastify = Fastify({ logger: true });

  // 2. Enregistrer tous les plugins, routes, middlewares, etc.
  await app(fastify);

  // 3. Lancer le serveur HTTP (Fastify expose `fastify.server`)
  await fastify.listen({ port: Number(process.env.PORT) });
}

startServer();
