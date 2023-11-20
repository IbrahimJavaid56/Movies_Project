// import mongoose from "mongoose";
// import Joi from 'joi';
// import { Genre,genreSchema } from "./genre.js"; 
// // Define the movie Schema
// const movieSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim:true,
//         minlength:5,
//         maxlength:225
//     },
//     genre: {
//         type: genreSchema,
//         required: true
//     },
//     reviews:{
//         type:String,
//         default:false
//     },
//     ticketPrice:{
//         type:Number,
//         required:true,
//         minlength:0
//     }

// });

// const Movie = mongoose.model('Movie', movieSchema);
// //validate Movie
// function validateMovie(movie){
//     const schema =Joi.object({
//         title: Joi.string().min(5).max(225).required(),
//         reviews: Joi.string(),
//         ticketPrice:Joi.number().min(0).required()
//     });
//     return schema.validate(movie);
// }

// export{Movie,validateMovie};

import mongoose from "mongoose";
import Joi from 'joi';
import { genreSchema } from "./genre.js"; 

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 225
    },
    genre: {
        type: genreSchema,
        required: true
    },
    reviews: {
        type: String,
        default: false
    },
    ticketPrice: {
        type: Number,
        required: true,
        minlength: 0
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength:255
    },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(225).required(),
        genre: Joi.object({
            category: Joi.string().required()
        }).required(),
        reviews: Joi.string(),
        ticketPrice: Joi.number().min(0).required(),
        numberInStock:Joi.number().min(0).max(255).required()
    });

    return schema.validate(movie);
}

export { Movie, validateMovie };
