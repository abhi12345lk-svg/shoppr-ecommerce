import express from "express";

import authAdmin from "../middlewares/authAdmin.js";

import {

addContactMessage,
getContactMessages,
updateContactStatus,
deleteContactMessage

} from "../controllers/contactController.js";

const contactRouter = express.Router();

/* ================= CONTACT ROUTES ================= */

// Add Message
contactRouter.post(
'/add',
addContactMessage
);

// Get All Messages (Admin)
contactRouter.get(
'/list',
authAdmin,
getContactMessages
);

// Update Status (Admin)
contactRouter.post(
'/status',
authAdmin,
updateContactStatus
);

// Delete Message (Admin)
contactRouter.post(
'/delete',
authAdmin,
deleteContactMessage
);

export default contactRouter;