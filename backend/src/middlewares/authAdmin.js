import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    // 1. Check cookies
    let adminToken = req.cookies?.adminToken;

    // 2. Check Authorization header (Bearer <token>)
    if (!adminToken && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        adminToken = req.headers.authorization.split(" ")[1];
    }

    // 3. Check direct header admintoken or token
    if (!adminToken && req.headers.admintoken) {
        adminToken = req.headers.admintoken;
    }
    if (!adminToken && req.headers["admin-token"]) {
        adminToken = req.headers["admin-token"];
    }
    if (!adminToken && req.headers.token) {
        adminToken = req.headers.token;
    }

    if (!adminToken) {
        return res.status(401).json({ success: false, message: "Not Authorized Login again" });
    }

    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

        if (decoded && decoded.email === process.env.ADMIN_EMAIL) {
            req.adminEmail = decoded.email;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized Login again" });
        }
    } catch (error) {
        console.log("AuthAdmin Error:", error.message);
        return res.status(401).json({ success: false, message: "Session expired or invalid admin token. Please login again." });
    }
};

export default authAdmin;