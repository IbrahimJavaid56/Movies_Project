import express from 'express';
import { addMovie } from '../controllers/movie.js';
const movieRouter = express.Router();

movieRouter.post('/addmovie',addMovie)
export  {movieRouter};