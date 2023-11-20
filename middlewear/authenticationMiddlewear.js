import jwt from "jsonwebtoken";
import {User} from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const SECRECT_KEY ='mysecretekey'
const  authenticateMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token,SECRECT_KEY);
    const user = await User.findOne({ email: decoded.email });
    console.log(user);
    // Check if the user has isAdmin property set to true
    if (user.isAdmin !== true) {
      return res
        .status(403)
        .json({ error: "DONOT HAVE PERMISSION TO CREATE TASK" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
export {authenticateMiddleware};