import mongoose from 'mongoose';
import express,{json} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import customerRouter from './routes/customer.js';
import { addUser,verifyUser,signIn,addAdmin } from './controllers/user.js';
import {addGenre}  from './controllers/genre.js';
import { addMovie } from './controllers/movie.js';
import { addTask } from './controllers/Task.js';
import {authenticateMiddleware} from './middlewear/authenticationMiddlewear.js';
const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

app.use(express.json());
//END POINTS
app.use('/api/customer',customerRouter)
app.use('/api/user',addUser)
app.use('/api/genre',addGenre)
app.use('/api/movie',addMovie)
app.get('/verify/:token', verifyUser);
app.use('/api/login',signIn);
app.use('/admin',addAdmin);
app.use('/task',authenticateMiddleware,addTask);

mongoose.connect(dbUrl)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
