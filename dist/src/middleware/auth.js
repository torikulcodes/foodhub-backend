import { auth as betterAuth } from ".././lib/auth";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PROVIDER"] = "PROVIDER";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (UserRole = {}));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authenticated",
                });
            }
            //   if (!session.user.emailVerified) {
            //     return res.status(401).json({
            //       success: false,
            //       message: "Email verification required. please verify your email",
            //     });
            //   }
            const user = req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                emailVerified: session.user.emailVerified,
                status: session.user.status,
            };
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }
            if (user.status !== "ACTIVE") {
                return res.status(401).json({
                    success: false,
                    message: "Your account is not active. please contact support",
                });
            }
            if (roles.length && !roles.includes(user.role)) {
                return res.status(401).json({
                    success: false,
                    message: "Forbidden: You don't have permission to access this resource",
                });
            }
            next();
        }
        catch (e) {
            next(e);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map