import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { FastifyInstance } from "fastify";
import mongodb from "./plugins/mongodb";
import registerRoutes from "./routes";

export default async function app(fastify: FastifyInstance) {
  await fastify.register(mongodb);

  await fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  await fastify.register(fastifyCors, {
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  registerRoutes(fastify);
  // Ajoute ça temporairement dans app.ts
  fastify.get("/", async () => {
    return { message: "API is working 🔥" };
  });
}
