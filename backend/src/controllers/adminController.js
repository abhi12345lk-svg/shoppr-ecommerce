    import jwt from "jsonwebtoken";

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: process.env.APP_ENV === "production" ? "none" : "strict"
    };

    // ================= ADMIN LOGIN =================
    // /api/admin/login

    const adminLogin = async (req, res) => {

        try {

            const { email, password } = req.body;

            if (
                email === process.env.ADMIN_EMAIL &&
                password === process.env.ADMIN_PASSWORD
            ) {

                const token = jwt.sign(
                    { email },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                res.cookie("adminToken", token, {
                    ...cookieOptions,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                return res.json({
                    success: true,
                    message: "Admin Logged In"
                });

            } else {

                return res.json({
                    success: false,
                    message: "Invalid Credentials"
                });
            }

        } catch (error) {

            console.log(error.message);

            res.json({
                success: false,
                message: error.message
            });
        }
    };

    // ================= ADMIN AUTH CHECK =================
    // /api/admin/is-auth

    const isAdminAuth = async (req, res) => {

        try {

            return res.json({
                success: true
            });

        } catch (error) {

            console.log(error.message);

            res.json({
                success: false,
                message: error.message
            });
        }
    };

    // ================= ADMIN LOGOUT =================
    // /api/admin/logout

    const adminLogout = async (req, res) => {

        try {

            res.clearCookie("adminToken", cookieOptions);

            return res.json({
                success: true,
                message: "Admin Logged out"
            });

        } catch (error) {

            console.log(error.message);

            res.json({
                success: false,
                message: error.message
            });
        }
    };

    export { adminLogin, isAdminAuth, adminLogout };