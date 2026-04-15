import { CreateDiet } from "../../type/product.type";
export declare const dietService: {
    createDiet: (data: CreateDiet) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isActive: boolean;
    }>;
    getAllDiets: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isActive: boolean;
    }[]>;
};
//# sourceMappingURL=diets.service.d.ts.map