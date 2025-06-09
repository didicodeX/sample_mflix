import { FastifyReply, FastifyRequest } from "fastify";
import { movieService } from "./movie.service";

export const getMovies = async (req: FastifyRequest, reply: FastifyReply) => {
  const movies = await movieService.getMovies();
  reply.send(movies)
}