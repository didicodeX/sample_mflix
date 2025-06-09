import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(async (fastify: FastifyInstance) => {
  try {
    await mongoose.connect(String(process.env.MONGO_URI));
    fastify.log.info("MongoDB connected");
  } catch (err) {
    fastify.log.error(err, "MongoDB connection failed");
    process.exit(1);
  }
});
