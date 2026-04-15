export interface CreateProduct {
    name: string;
    description?: string | null;
    categoryId: string;
    price: number;
    image: string;
    discount?: number;
    isActive?: boolean;
    stock?: number;
    diets?: string[] | undefined;
}
export interface Category {
    id: string;
    name: string;
    slug?: string;
    image?: string;
    description?: string;
    isActive: boolean;
    discount?: number;
    discountStart?: Date;
    discountEnd?: Date;
    providerId: string;
    order?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateDiet {
    id: string;
    name: string;
    isActive?: boolean | true;
    slug: string;
    description?: string | null;
}
export interface CreateOrderPayload {
    userId: string;
    totalPrice: number;
    deliveryAddress: string;
    grandTotal: number;
    phone: string;
    totalDiscount?: number;
    totalQuantity: number;
    notes?: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
        discount?: number;
    }[];
}
//# sourceMappingURL=product.type.d.ts.map