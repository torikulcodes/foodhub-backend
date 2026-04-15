import { CreateProduct } from "../../type/product.type";
import { User } from "../../type/user.type";
import { IQueryParams } from "../../type/queryBuilder";
export declare const productService: {
    createProduct: (data: CreateProduct, user: User) => Promise<({
        provider: {
            id: string;
            name: string;
        };
        category: {
            id: string;
            name: string;
        };
        diets: ({
            diet: {
                id: string;
                name: string;
            };
        } & {
            productId: string;
            dietId: string;
        })[];
    } & {
        id: string;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        description: string | null;
        isActive: boolean;
        price: number;
        discount: number | null;
        views: number;
        ordersCount: number;
        stock: number;
        categoryId: string;
    }) | null>;
    getAllProducts: (query: IQueryParams) => Promise<{
        data: {
            id: string;
            name: string;
            price: number;
            discount: number | null;
            image: string;
            description: string | null;
            stock: number;
            category: string;
            categoryId: string;
            diets: {
                id: string;
                name: string;
            }[];
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProductById: (id: string) => Promise<({
        provider: {
            name: string;
        };
        category: {
            id: string;
            name: string;
        };
        diets: ({
            diet: {
                id: string;
                name: string;
            };
        } & {
            productId: string;
            dietId: string;
        })[];
    } & {
        id: string;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        description: string | null;
        isActive: boolean;
        price: number;
        discount: number | null;
        views: number;
        ordersCount: number;
        stock: number;
        categoryId: string;
    }) | null>;
    getOwnProduct: (user: User, query: IQueryParams) => Promise<import("../../type/queryBuilder").IQueryResult<{
        id: string;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        description: string | null;
        isActive: boolean;
        price: number;
        discount: number | null;
        views: number;
        ordersCount: number;
        stock: number;
        categoryId: string;
    }>>;
};
//# sourceMappingURL=product.service.d.ts.map