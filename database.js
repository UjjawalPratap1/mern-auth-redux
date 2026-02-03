import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

export default db;
