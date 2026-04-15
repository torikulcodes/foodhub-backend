import { categoryService } from "./category.service";
const createCategory = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        const data = req.body;
        const result = await categoryService.createCategory(data);
        res.status(200).json({
            message: "Category created successfully",
            status: true,
            data: result,
        });
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e.message || "Something went wrong",
        });
    }
};
const getAllCategories = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            message: "Categories retrieved successfully",
            status: true,
            data: categories,
        });
    }
    catch (e) {
        next(e);
    }
};
export const categoryController = {
    createCategory,
    getAllCategories,
};
//# sourceMappingURL=category.controller.js.map