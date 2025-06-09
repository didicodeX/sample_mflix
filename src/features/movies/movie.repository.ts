import { Movie } from "./movie.model";

export const movieRepository = {
  findAll: () => Movie.find().limit(50),
  findById: (id: string) => Movie.findById(id),
};
