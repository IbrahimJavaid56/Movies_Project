import express from "express";
import { addTask } from "../controllers/Task.js";
const taskRouter = express.Router();

taskRouter.post('/add-Task',addTask);

export default taskRouter;
