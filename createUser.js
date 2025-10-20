import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const createUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123456", salt);

  const user = new User({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
  });

  await user.save();
  console.log("User created");
  mongoose.disconnect();
};

createUser();
