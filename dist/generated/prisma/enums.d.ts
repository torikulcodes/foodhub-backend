export declare const OrderStatus: {
    readonly PLACED: "PLACED";
    readonly PROCESSING: "PROCESSING";
    readonly PARTIALLY_SHIPPED: "PARTIALLY_SHIPPED";
    readonly SHIPPED: "SHIPPED";
    readonly PARTIALLY_DELIVERED: "PARTIALLY_DELIVERED";
    readonly DELIVERED: "DELIVERED";
    readonly PARTIALLY_CANCELLED: "PARTIALLY_CANCELLED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const OrderItemStatus: {
    readonly PLACED: "PLACED";
    readonly PROCESSING: "PROCESSING";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
    readonly RETURNED: "RETURNED";
};
export type OrderItemStatus = (typeof OrderItemStatus)[keyof typeof OrderItemStatus];
export declare const ReviewStatus: {
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
//# sourceMappingURL=enums.d.ts.map