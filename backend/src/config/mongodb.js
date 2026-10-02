import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MongoDB Error: MONGODB_URI is not defined in backend/.env");
    return;
  }

  if (uri.includes("<username>") || uri.includes("<password>")) {
    console.warn("⚠️  MongoDB Warning: Please replace <username> and <password> with your actual MongoDB Atlas credentials in backend/.env");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
    console.log("Ready State:", mongoose.connection.readyState);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message || error);
    if (uri.includes("localhost") || uri.includes("127.0.0.1")) {
      console.error("💡 Tip: Local MongoDB is not running. Switch to MongoDB Atlas in backend/.env or start your local MongoDB service.");
    }
  }
};

export default connectDB;