/* ======================= USERCONTROLLER.JS ======================= */

import userModel from "../models/user.model.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* ================= COOKIE OPTIONS ================= */

const cookieOptions={

httpOnly:true,

secure:process.env.APP_ENV==="production",

sameSite:
process.env.APP_ENV==="production"
?"none"
:"strict"

}

/* ================= REGISTER USER ================= */

const registerUser=async(req,res)=>{

try{

const{
name,
email,
password
}=req.body

const exists=
await userModel.findOne({email})

if(exists){

return res.json({

success:false,

message:"User already exists"

})

}

if(!validator.isEmail(email)){

return res.json({

success:false,

message:"Please enter a valid email"

})

}

if(password.length<8){

return res.json({

success:false,

message:"Please enter a strong password"

})

}

const hashedPassword=
await bcrypt.hash(password,10)

const newUser=new userModel({

name,

email,

password:hashedPassword

})

const user=await newUser.save()

const token=jwt.sign(

{id:user._id},

process.env.JWT_SECRET,

{expiresIn:"7d"}

)

res.cookie(

"token",

token,

{

...cookieOptions,

maxAge:
7*24*60*60*1000

}

)

return res.json({

success:true,

message:"Account Created",

user:{

_id:user._id,

name:user.name,

email:user.email

}

})

}catch(error){

console.log(error.message)

res.json({

success:false,

message:error.message

})

}

}

/* ================= LOGIN USER ================= */

const loginUser=async(req,res)=>{

try{

const{
email,
password
}=req.body

const user=
await userModel.findOne({email})

if(!user){

return res.json({

success:false,

message:"User doesn't exist"

})

}

const isMatch=
await bcrypt.compare(
password,
user.password
)

if(!isMatch){

return res.json({

success:false,

message:"Invalid Credentials"

})

}

const token=jwt.sign(

{id:user._id},

process.env.JWT_SECRET,

{expiresIn:"7d"}

)

res.cookie(

"token",

token,

{

...cookieOptions,

maxAge:
7*24*60*60*1000

}

)

return res.json({

success:true,

message:"Login Successful",

user:{

_id:user._id,

name:user.name,

email:user.email

}

})

}catch(error){

console.log(error.message)

res.json({

success:false,

message:error.message

})

}

}

/* ================= CHECK AUTH ================= */

const isAuth=async(req,res)=>{

try{

const{userId}=req

const user=await userModel
.findById(userId)
.select("-password")

return res.json({

success:true,

user

})

}catch(error){

console.log(error.message)

res.json({

success:false,

message:error.message

})

}

}

/* ================= UPDATE CART ================= */

const updateCart=async(req,res)=>{

try{

const{userId}=req

const{cartData}=req.body

await userModel.findByIdAndUpdate(
userId,
{cartData}
)

res.json({

success:true,

message:"Cart Updated"

})

}catch(error){

res.json({

success:false,

message:error.message

})

}

}

/* ================= GET CART ================= */

const getCart=async(req,res)=>{

try{

const{userId}=req

const user=await userModel.findById(userId)

res.json({

success:true,

cartData:user.cartData

})

}catch(error){

res.json({

success:false,

message:error.message

})

}

}

/* ================= LOGOUT ================= */

const logout=async(req,res)=>{

try{

res.clearCookie(
"token",
cookieOptions
)

return res.json({

success:true,

message:"Successfully Logged Out"

})

}catch(error){

console.log(error.message)

res.json({

success:false,

message:error.message

})

}

}

export{

registerUser,

loginUser,

isAuth,

logout,

updateCart,

getCart

}