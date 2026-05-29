import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
    console.log("Ready State:", mongoose.connection.readyState);

  } catch (error) {
    console.log("❌ MongoDB Error:", error);
  }
};

export default connectDB;