
import { Genre, validateGenre } from '../models/genre.js';

async function addGenre(req, res) {
    try {
        const { error } = validateGenre(req.body);

        if (error) {
            return res.status(400).send({ message: 'Genres data not validated', error: error });
        }

        const newGenre = new Genre({
            category: req.body.category,
            rating: req.body.rating
        });

        const savedGenre = await newGenre.save();

        res.send(savedGenre);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
}

export { addGenre };
