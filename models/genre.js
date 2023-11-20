import mongoose from "mongoose";
import Joi from 'joi';

// Define the customer Schema
const genreSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        minlength: 7,
        maxlength:225
    },
    rating:{
        type:Number,
        required: true,
        minlength: 1,
        maxlength:5
    }
});

const Genre = mongoose.model('Genre', genreSchema);
//validate Genre
function validateGenre(genre){
    const schema =Joi.object({
        category: Joi.string().min(7).max(225).required(),
        rating: Joi.number().min(1).max(5).required()
    });
    return schema.validate(genre);
}

export{genreSchema,Genre,validateGenre};
