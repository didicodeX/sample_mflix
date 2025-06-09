import { movieRepository } from './movie.repository'

export const movieService = {
  getMovies: () => movieRepository.findAll(),
  getMovieById: (id: string) => movieRepository.findById(id),
}
