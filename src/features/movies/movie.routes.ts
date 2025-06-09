import { FastifyInstance } from "fastify";
import { getMovies } from "./movie.controller";

export default function movieRoutes(fastify: FastifyInstance){
  fastify.get("/",getMovies)
  // fastify.get("/:id",)
}