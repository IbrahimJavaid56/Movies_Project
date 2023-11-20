import mongoose, { model } from "mongoose";
import Joi from 'joi';

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:225
    },
    email: {
        type: String,
        // required: true,
        unique:true,
        minLength: 5,
        maxLength:225
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength:1024
    },
    isAdmin: {
        type : Boolean,
        default : false,
        required: false
    },
    rememberToken:{
        type: String
    }
});
const User = mongoose.model('User',userSchema);
function validateUser(user){
    const schema =Joi.object({
        username: Joi.string().min(5).max(225).required(),
        email: Joi.string().min(5).max(225).required().email(),
        password: Joi.string().min(3).max(1024).required(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user);
}
export {User,validateUser};
