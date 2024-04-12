import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const instantDB = await mongoose.connect(
      `${process.env.MONGODB_URL || "mongodb://localhost:27017"}/${DB_NAME}`
    );
    if (instantDB) {
      console.log(`DB Connect !! ${instantDB.connection.host}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
