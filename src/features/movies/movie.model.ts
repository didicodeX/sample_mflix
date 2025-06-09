import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  plot: { type: String },
  runtime: { type: Number },
  cast: { type: [String] },
  tomatoes: { type: Object },
});

export const Movie = mongoose.model("Movie", movieSchema, "movies"); // important: collection = "movies"
