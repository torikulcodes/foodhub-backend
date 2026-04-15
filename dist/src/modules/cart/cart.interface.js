// model Cart {
//   id        String     @id @default(uuid())
//   createdAt DateTime   @default(now())
//   updatedAt DateTime   @updatedAt
//   userId    String     @unique
//   user      User       @relation("UserCarts", fields: [userId], references: [id])
//   items     CartItem[]
// }
export {};
//# sourceMappingURL=cart.interface.js.map