// src/server.ts
import "dotenv/config";
import Fastify from "fastify";
import app from "./app";

const server = Fastify({ logger: true });

async function start() {
  try {
    await app(server);
    await server.listen({ port: Number(process.env.PORT) });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
