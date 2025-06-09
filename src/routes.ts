import { FastifyInstance } from "fastify";
import movieRoutes from "./features/movies/movie.routes";

export default function registerRoutes(fastify: FastifyInstance) {
  fastify.register(movieRoutes, { prefix: "/movies" });
}
