import { OrderStatus, OrderItemStatus } from "../../../generated/prisma/enums";
import { CreateOrderPayload } from "../../type/product.type";
import { User } from "../../type/user.type";
export declare const orderService: {
    createOrder: (data: CreateOrderPayload, user: User) => Promise<{
        items: ({
            product: {
                id: string;
                name: string;
                image: string;
                providerId: string;
                price: number;
            };
        } & {
            status: OrderItemStatus;
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        phone: string;
        totalPrice: number;
        totalQuantity: number;
        totalDiscount: number;
        grandTotal: number;
        canReturn: boolean;
        canCancel: boolean;
        cancelledAt: Date | null;
        notes: string | null;
        deliveryAddress: string;
    }>;
    getAllOrdersByuser: (user: User) => Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                image: string;
                providerId: string;
                price: number;
            };
        } & {
            status: OrderItemStatus;
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        phone: string;
        totalPrice: number;
        totalQuantity: number;
        totalDiscount: number;
        grandTotal: number;
        canReturn: boolean;
        canCancel: boolean;
        cancelledAt: Date | null;
        notes: string | null;
        deliveryAddress: string;
    })[]>;
    updateOrderStatusSimple: (orderId: string, status: string, user: User) => Promise<{
        items: ({
            product: {
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
            };
        } & {
            status: OrderItemStatus;
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        phone: string;
        totalPrice: number;
        totalQuantity: number;
        totalDiscount: number;
        grandTotal: number;
        canReturn: boolean;
        canCancel: boolean;
        cancelledAt: Date | null;
        notes: string | null;
        deliveryAddress: string;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map