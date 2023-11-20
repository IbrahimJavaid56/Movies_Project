import express from 'express';
import { addGenre } from '../controllers/genre.js';
const genreRouter = express.Router();

genreRouter.post('/addgenre',addGenre)

export  {genreRouter};