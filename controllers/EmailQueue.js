import Queue from 'bull';
const emailQueue = new Queue('emailVerification');
import {Job} from '../models/Job.js';
import { transport } from '../config/EmailConfig.js';
import { FailedJob } from '../models/FailedJob.js';

// EmailQueue process function.
emailQueue.process('emailVerification', async (job) => {
   
    const email = job.data.jobModel.email;
    const token = job.data.verificationToken;
  try
  {
    let verificationLink = `http://localhost:3000/verify/${token}`;
    const mailOptions = {
      from: 'ibrahimjavaid56@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="${verificationLink}">here</a> to verify your account.`,
    };
    // Transport object for sending emails
    await transport.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    // Remove the job details from the Jobs table
    setTimeout(async ()=>{
      await Job.deleteOne({email:email});
    },10000);
  } catch (error) {
    console.log('Failed to send verification email', error);
    await saveFailedJob(email);
  }
});
async function saveFailedJob(email) {
  try {
    const failedJob = new FailedJob({
      email: email,
    });
    await failedJob.save();
    console.log(`Failed job saved for email: ${email}`);
  } catch (error) {
    console.error('Failed to save failed job details', error);
  }
}
export {emailQueue};