import { Category } from "../../type/product.type";
export declare const categoryService: {
    createCategory: (data: Category) => Promise<{
        id: string;
        name: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isActive: boolean;
        orderCount: number | null;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isActive: boolean;
        orderCount: number | null;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map