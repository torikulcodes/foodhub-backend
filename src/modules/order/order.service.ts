import {
  OrderStatus,
  OrderItemStatus,
} from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../middleware/error/app.error.js";
import { CreateOrderPayload } from "../../type/product.type.js";
import { User } from "../../type/user.type.js";
import { UserRole } from "../../middleware/auth.js";
const createOrder = async (data: CreateOrderPayload, user: User) => {
  const { items, deliveryAddress, phone, notes } = data;

  if (!items || items.length === 0) {
    throw new AppError("Order must contain at least one item", 400);
  }

  // 🔹 Step 1: Normalize items
  const normalizedItems = items.map((item: any) => {
    const productId = item.productId;
    const quantity = Number(item.quantity);

    if (!productId || Number.isNaN(quantity)) {
      throw new AppError("Invalid item data", 400);
    }

    if (quantity < 1) {
      throw new AppError("Item quantity must be at least 1", 400);
    }

    return { productId, quantity };
  });

  // 🔹 Step 2: Get products from DB
  const productIds = [...new Set(normalizedItems.map((i) => i.productId))];

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new AppError("One or more product ids are invalid", 400);
  }

  // map-er type define korun [key, value]
  const productMap = new Map<string, any>(products.map((p: any) => [p.id, p]));

  // 🔹 Step 3: Calculate totals (SERVER SIDE 🔥)
  let totalPrice = 0;
  let totalQuantity = 0;
  let totalDiscount = 0;

  const finalItems = normalizedItems.map((item: any) => {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new AppError("Product not found", 400);
    }

    // 👉 Stock check
    if ((product as any).stock < item.quantity) {
      throw new AppError(
        `Insufficient stock for product: ${(product as any).name}`,
        400,
      );
    }

    const price = Number((product as any).price);

    totalPrice += price * item.quantity;
    totalQuantity += item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity,
      price,
    };
  });

  const grandTotal = totalPrice - totalDiscount;

  // 🔹 Step 4: Transaction (VERY IMPORTANT 🔥)
  const order = await prisma.$transaction(async (tx: any) => {
    // 👉 Create Order
    const createdOrder = await tx.order.create({
      data: {
        userId: user.id,
        totalPrice,
        totalQuantity,
        totalDiscount,
        grandTotal,
        deliveryAddress,
        phone,
        notes: notes ?? null,
        status: OrderStatus.PLACED,
        items: {
          create: finalItems,
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                providerId: true,
              },
            },
          },
        },
      },
    });

    // 👉 Update stock
    for (const item of finalItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return createdOrder;
  });

  return order;
};

const getAllOrdersByuser = async (user: User) => {
  const orders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          product: {
            providerId: user.id,
          },
        },
      },
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              providerId: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders;
};

const calculateOrderStatus = (itemStatuses: OrderItemStatus[]): OrderStatus => {
  // Map OrderItemStatus array to overall OrderStatus
  if (itemStatuses.every((s) => s === OrderItemStatus.CANCELLED))
    return OrderStatus.CANCELLED;
  if (itemStatuses.every((s) => s === OrderItemStatus.DELIVERED))
    return OrderStatus.DELIVERED;
  if (itemStatuses.some((s) => s === OrderItemStatus.DELIVERED))
    return OrderStatus.PARTIALLY_DELIVERED;
  if (itemStatuses.some((s) => s === OrderItemStatus.CANCELLED))
    return OrderStatus.PARTIALLY_CANCELLED;
  if (itemStatuses.every((s) => s === OrderItemStatus.SHIPPED))
    return OrderStatus.SHIPPED;
  if (itemStatuses.some((s) => s === OrderItemStatus.SHIPPED))
    return OrderStatus.PARTIALLY_SHIPPED;

  return OrderStatus.PLACED;
};

const updateOrderStatusSimple = async (
  orderId: string,
  status: string,
  user: User,
) => {
  // ✅ Validate status
  if (!Object.values(OrderItemStatus).includes(status as OrderItemStatus)) {
    throw new AppError("Invalid status", 400);
  }

  const newStatus = status as OrderItemStatus;

  return await prisma.$transaction(async (tx: any) => {
    // 🔹 Get order with items
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: { providerId: true },
            },
          },
        },
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const role = (user as any).role;

    // 🔒 Permission check
    if (role === UserRole.CUSTOMER && order.userId !== user.id) {
      throw new AppError("Forbidden", 403);
    }

    if (role === UserRole.PROVIDER) {
      const hasAccess = order.items.some(
        (item: any) => item.product.providerId === user.id,
      );

      if (!hasAccess) {
        throw new AppError("Forbidden", 403);
      }
    }

    // 🚨 Prevent invalid updates
    const invalidStatuses: OrderItemStatus[] = [
      OrderItemStatus.DELIVERED,
      OrderItemStatus.CANCELLED,
      OrderItemStatus.RETURNED,
    ];

    const updatableItems = order.items.filter(
      (item: any) => !invalidStatuses.includes(item.status as OrderItemStatus),
    );

    if (updatableItems.length === 0) {
      throw new AppError("No items can be updated", 400);
    }

    // 🔹 Validate transition
    const allowedTransitions: Record<OrderItemStatus, OrderItemStatus[]> = {
      [OrderItemStatus.PLACED]: [
        OrderItemStatus.PROCESSING,
        OrderItemStatus.CANCELLED,
      ],
      [OrderItemStatus.PROCESSING]: [
        OrderItemStatus.SHIPPED,
        OrderItemStatus.CANCELLED,
      ],
      [OrderItemStatus.SHIPPED]: [
        OrderItemStatus.DELIVERED,
        OrderItemStatus.RETURNED,
      ],
      [OrderItemStatus.DELIVERED]: [],
      [OrderItemStatus.CANCELLED]: [],
      [OrderItemStatus.RETURNED]: [],
    };

    // 🔹 Update all items
    for (const item of updatableItems) {
      const current = item.status as OrderItemStatus;

      if (current !== newStatus) {
        const allowed = allowedTransitions[current] || [];

        if (!allowed.includes(newStatus)) {
          throw new AppError(
            `Invalid transition from ${current} to ${newStatus}`,
            400,
          );
        }
      }

      await tx.orderItem.update({
        where: { id: item.id },
        data: { status: newStatus },
      });
    }

    // 🔹 Recalculate order status
    const updatedItems = await tx.orderItem.findMany({
      where: { orderId },
      select: { status: true },
    });

    const itemStatuses = updatedItems.map(
      (i: any) => i.status as OrderItemStatus,
    );

    const newOrderStatus = calculateOrderStatus(itemStatuses);

    // 🔹 Update order
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: newOrderStatus },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return updatedOrder;
  });
};

export const orderService = {
  createOrder,
  getAllOrdersByuser,
  updateOrderStatusSimple,
};
