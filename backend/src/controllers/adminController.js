import jwt from "jsonwebtoken";

const isProd = process.env.APP_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/"
};

// ================= ADMIN LOGIN =================
// /api/admin/login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("adminToken", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.json({ success: true, message: "Admin Logged In", token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
    }
  } catch (error) {
    console.log("Admin Login Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ADMIN AUTH CHECK =================
// /api/admin/is-auth

const isAdminAuth = async (req, res) => {
  try {
    let adminToken = req.cookies?.adminToken;

    if (!adminToken && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      adminToken = req.headers.authorization.split(" ")[1];
    }

    if (!adminToken && req.headers.admintoken) {
      adminToken = req.headers.admintoken;
    }

    if (!adminToken) {
      return res.json({ success: false, isAuth: false, isAdmin: false });
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decoded && decoded.email === process.env.ADMIN_EMAIL) {
      return res.json({ success: true, isAuth: true, isAdmin: true });
    }

    return res.json({ success: false, isAuth: false, isAdmin: false });
  } catch (error) {
    return res.json({ success: false, isAuth: false, isAdmin: false });
  }
};

// ================= ADMIN LOGOUT =================
// /api/admin/logout

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", cookieOptions);
    return res.json({ success: true, message: "Admin Logged out" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { adminLogin, isAdminAuth, adminLogout };