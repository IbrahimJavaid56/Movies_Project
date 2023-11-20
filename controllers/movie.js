import { Movie, validateMovie } from "../models/movie.js";
import { Genre } from "../models/genre.js";

async function addMovie(req, res) {
  try {
    const { error } = validateMovie(req.body);
    if (error) {
      return res
        .status(400)
        .send({ message: "Movie data not validated", error: error });
    }
    const genreCategory = req.body.genre.category;
    // Check if the genre category already exists in the genre collection
    let existingGenre = await Genre.findOne({ category: genreCategory }).select('-__v');

    if (!existingGenre) {
      existingGenre = new Genre({
        category: genreCategory
      });
      // Save the new genre to the genre collection
      existingGenre = await existingGenre.save();
    }
    // Create a new Movie using the existing or newly created genre
    const newMovie = new Movie({
      title: req.body.title,
      genre: existingGenre,
      reviews: req.body.reviews,
      ticketPrice: req.body.ticketPrice,
    });
    // Save the new movie to the movie collection
    const savedMovie = await newMovie.save();

    res.send(savedMovie);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}
export { addMovie };
