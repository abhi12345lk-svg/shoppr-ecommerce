import mongoose from "mongoose";

/* ================= CONTACT SCHEMA ================= */

const contactSchema = new mongoose.Schema({

name: {
type: String,
required: true
},

email: {
type: String,
required: true
},

phone: {
type: String,
required: true
},

subject: {
type: String,
required: true
},

message: {
type: String,
required: true
},

status: {
type: String,
default: "Pending"
},

isRead: {
type: Boolean,
default: false
}

},{
timestamps: true
});

/* ================= MODEL ================= */

const contactModel = mongoose.models.contact || mongoose.model(
"contact",
contactSchema
);

export default contactModel;