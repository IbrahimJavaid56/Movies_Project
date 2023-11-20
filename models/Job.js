// Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  email: {
    type: String,
    required :true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);
export {Job};
