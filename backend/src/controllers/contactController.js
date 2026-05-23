import contactModel from "../models/contact.model.js";

/* ================= ADD CONTACT MESSAGE ================= */
/* /api/contact/add */

export const addContactMessage = async (req,res)=>{

try{

const{
name,
email,
phone,
subject,
message
}=req.body;

/* ================= VALIDATION ================= */

if(
!name ||
!email ||
!phone ||
!subject ||
!message
){

return res.json({

success:false,

message:"Please fill all fields"

});

}

/* ================= SAVE MESSAGE ================= */

await contactModel.create({

name,
email,
phone,
subject,
message

});

/* ================= RESPONSE ================= */

res.json({

success:true,

message:"Message Sent Successfully"

});

}catch(error){

console.log(error.message);

res.json({

success:false,

message:error.message

});

}

};

/* ================= GET ALL CONTACT MESSAGES ================= */
/* /api/contact/list */

export const getContactMessages = async (req,res)=>{

try{

const messages =
await contactModel

.find({})

.sort({
createdAt:-1
});

res.json({

success:true,

messages

});

}catch(error){

console.log(error.message);

res.json({

success:false,

message:error.message

});

}

};

/* ================= UPDATE MESSAGE STATUS ================= */
/* /api/contact/status */

export const updateContactStatus = async (req,res)=>{

try{

const{
messageId,
status
}=req.body;

await contactModel.findByIdAndUpdate(

messageId,

{
status,
isRead:true
}

);

res.json({

success:true,

message:"Status Updated"

});

}catch(error){

console.log(error.message);

res.json({

success:false,

message:error.message

});

}

};

/* ================= DELETE MESSAGE ================= */
/* /api/contact/delete */

export const deleteContactMessage = async (req,res)=>{

try{

const{
messageId
}=req.body;

await contactModel.findByIdAndDelete(
messageId
);

res.json({

success:true,

message:"Message Deleted Successfully"

});

}catch(error){

console.log(error.message);

res.json({

success:false,

message:error.message

});

}

};