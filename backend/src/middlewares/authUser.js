import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    // 1. Check cookies
    let token = req.cookies?.token;

    // 2. Check Authorization header (Bearer <token>)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 3. Check direct header token
    if (!token && req.headers.token) {
        token = req.headers.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
        }
    } catch (error) {
        console.log("AuthUser Error:", error.message);
        return res.status(401).json({ success: false, message: "Session expired or invalid token. Please login again." });
    }
};

export default authUser;