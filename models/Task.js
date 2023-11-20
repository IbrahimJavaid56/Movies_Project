import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    }
  },
  { timestamps: true } 
);


// Create the Task model
const Task = mongoose.model("Task", taskSchema);

export { Task };