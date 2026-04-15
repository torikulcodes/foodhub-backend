import { userService } from "./user.service";
const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers();
        res
            .status(200)
            .json({ message: "Get all users", status: true, data: result });
    }
    catch (e) {
        next(e);
    }
};
export const userController = {
    getAllUsers,
};
//# sourceMappingURL=user.controller.js.map