import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDb connected successfully");
  } catch (error) {
    console.log(`mongoDB error ${error}`);
  }
};

export default connectDB;
