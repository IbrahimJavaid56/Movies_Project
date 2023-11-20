// Failed_Job.js
import mongoose from 'mongoose';
const failedJobSchema = new mongoose.Schema({
  email: {
    type: String,
    required :true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const FailedJob = mongoose.model('FaliedJob', failedJobSchema);
export {FailedJob};