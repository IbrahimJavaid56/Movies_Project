import {Task} from "../models/Task.js";

 const addTask = async (req, res) => {
  const { title, description, status, assignedUser } = req.body;
  const task = await Task.create({
    title,
    description,
    status,
    assignedUser,
  });
  res.send("TASK ADDED SUCCESSFULLY");
};

export {addTask};