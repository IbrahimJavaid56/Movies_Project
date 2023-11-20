import mongoose from 'mongoose';
import { User, validateUser } from '../models/user.js';

async function seedingDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CINEMAPROJECTDB');
    console.log("Database Connected");

    const { error, value } = validateUser({
        username: "admin",
        email: "admin@gmail.com",
        password: "admin12",
         isAdmin: true,
      });

    if (error) {
      console.error("ValidationError", error.details[0].message);
    } else {
      const user = new User(value);
      await user.save();
      console.log("User added successfully!");
    }

    await mongoose.connection.close();
    console.log("DB connection closed");
  } catch (error) {
    console.error("DB connection error", error);
  }
}

seedingDatabase();
