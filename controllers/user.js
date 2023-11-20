import { User, validateUser } from '../models/user.js';
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Job } from '../models/Job.js';
import { emailQueue } from './EmailQueue.js';
import dotenv from 'dotenv';
dotenv.config();

const addUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({ message: 'User data not validated', error });
  }
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const verificationToken = generateVerificationToken();
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
    rememberToken: verificationToken,
  });
  // Save the user to the database
  newUser = await newUser.save();

  const jobModel = new Job({
    email: req.body.email
  });
  await jobModel.save();

  emailQueue.add('emailVerification', { jobModel, verificationToken });
  res.status(200).json({ message: 'Registration successful. Check your email for verification.' });
};
//VERIFICATION ENDPOINT
async function verifyUser(req, res) {
  const { token } = req.params;
  try {
    // Find the user by the verification token
    const user = await User.findOne({ rememberToken: token });
    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token' });
    }
    await User.updateOne(
        { email:user.email},
        { $set:{rememberToken:null}}
    );
  // Respond with a success message
    res.json({ message: 'Email verification successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify email' });
  }
}
//LOGIN ENDPOINT
async function signIn(req,res){
    const { email, password } = req.body;
    let existingUser = await User.findOne({email:email});
    if(!existingUser){
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    existingUser = _.pick(existingUser,['email','password']);
    const comparePass = await bcrypt.compare(password,existingUser.password);
    if(!comparePass){
        return res.status(400).json({message:"Password Did not match"});
    }
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},'mysecretekey')
    res.status(200).json({user:existingUser,token:token});

}
//FUNCTION TO GENERATE REMEMBERTOKEN.
  function generateVerificationToken() {
    const charactersToGenerateRandomToken = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let startIndex = 0; startIndex < 12; startIndex++) {
      const randomIndex = Math.floor(Math.random() * charactersToGenerateRandomToken.length);
      token = token + charactersToGenerateRandomToken.charAt(randomIndex);
    }
    return token;
}

const addAdmin = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({ message: 'User data not validated', error });
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const verificationToken = generateVerificationToken();

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
    rememberToken: verificationToken,
    isAdmin: true
  });

  // Save the user to the database
  newUser = await newUser.save();

  const jobModel = new Job({
    email: req.body.email,
  });
  await jobModel.save();

  emailQueue.add('emailVerification', { jobModel, verificationToken });
  res.status(200).json({ message: 'Registration successful. Check your email for verification.' });
};

export { addUser,signIn,verifyUser,addAdmin};

// // Add email verification job to the Bull queue
  // emailQueue.add('emailVerification',{ jobModel,verificationToken});

  //import {emailQueue} from './EmailQueue.js';

  //import { transport } from '../config/EmailConfig.js';