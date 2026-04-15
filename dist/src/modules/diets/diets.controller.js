import catchAsync from "../../helper/catchAsync";
import { dietService } from "./diets.service";
const createDiet = catchAsync(async (req, res) => {
    const data = req.body;
    const diet = await dietService.createDiet(data);
    res.status(201).json({
        status: "success",
        data: {
            diet,
        },
    });
});
const getAllDiets = catchAsync(async (req, res) => {
    const diets = await dietService.getAllDiets();
    res.status(200).json({
        status: "success",
        results: diets.length,
        data: diets
    });
});
export const dietController = {
    createDiet,
    getAllDiets,
};
//# sourceMappingURL=diets.controller.js.map