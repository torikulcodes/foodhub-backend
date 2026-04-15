import { User } from "better-auth";
import { cartData } from "./cart.interface";
export declare const cartService: {
    addToCart: (payload: cartData[], user: any) => Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    getCartItems: (user: User) => Promise<{
        items: ({
            product: {
                id: string;
                name: string;
                image: string;
                price: number;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
        totalCount: number;
    }>;
    deleteCartItem: (cartItemId: string, user: User) => Promise<{
        id: string;
        productId: string;
        quantity: number;
        cartId: string;
    }>;
};
//# sourceMappingURL=cart.service.d.ts.map