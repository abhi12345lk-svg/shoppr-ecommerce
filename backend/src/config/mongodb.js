import mongoose from 'mongoose';

const connectDB = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017/eCommerceDB');

    console.log('MongoDB Connected');

    let userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });

    let userModel = mongoose.model("users", userSchema);

    await userModel.create({
        name: "Abhishek",
        email: "abhishek@gmail.com",
        password: "123456"
    });

    console.log('User Data Inserted');
};

export default connectDB;