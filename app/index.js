var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import express from "express";
import cors from "cors";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id              String           @id\n  name            String\n  email           String           @unique\n  emailVerified   Boolean          @default(true)\n  image           String?\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  role            String           @default("CUSTOMER")\n  status          String           @default("ACTIVE")\n  cart            Cart?            @relation("UserCarts")\n  order           Order[]\n  product         Product[]\n  providerProfile ProviderProfile? @relation("providerProfile")\n  review          Review[]\n  accounts        Account[]\n  sessions        Session[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Cart {\n  id        String     @id @default(uuid())\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n  userId    String     @unique\n  user      User       @relation("UserCarts", fields: [userId], references: [id])\n  items     CartItem[]\n}\n\nmodel CartItem {\n  id        String  @id @default(uuid())\n  cartId    String\n  productId String\n  quantity  Int\n  cart      Cart    @relation(fields: [cartId], references: [id])\n  product   Product @relation("cartItemToProduct", fields: [productId], references: [id])\n\n  @@unique([cartId, productId])\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  userId          String\n  status          OrderStatus @default(PLACED)\n  totalPrice      Float\n  totalQuantity   Int\n  totalDiscount   Float       @default(0)\n  grandTotal      Float\n  canReturn       Boolean     @default(false)\n  canCancel       Boolean     @default(true)\n  cancelledAt     DateTime?\n  notes           String?\n  deliveryAddress String\n  phone           String\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n\n  user  User        @relation(fields: [userId], references: [id])\n  items OrderItem[]\n\n  @@index([status])\n  @@index([createdAt])\n  @@index([userId])\n}\n\nmodel OrderItem {\n  id        String          @id @default(uuid())\n  orderId   String\n  productId String\n  quantity  Int\n  price     Float\n  status    OrderItemStatus @default(PLACED)\n\n  order   Order   @relation(fields: [orderId], references: [id])\n  product Product @relation(fields: [productId], references: [id])\n\n  @@index([productId])\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  PARTIALLY_SHIPPED\n  SHIPPED\n  PARTIALLY_DELIVERED\n  DELIVERED\n  PARTIALLY_CANCELLED\n  CANCELLED\n}\n\nenum OrderItemStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  RETURNED\n}\n\nmodel Product {\n  id          String        @id @default(uuid())\n  name        String\n  price       Float\n  image       String\n  discount    Int?          @default(0)\n  isActive    Boolean       @default(true)\n  description String?\n  views       Int           @default(0)\n  ordersCount Int           @default(0)\n  stock       Int           @default(0)\n  categoryId  String\n  providerId  String\n  createdAt   DateTime      @default(now())\n  updatedAt   DateTime      @updatedAt\n  cartItem    CartItem[]    @relation("cartItemToProduct")\n  orderItem   OrderItem[]\n  category    Category      @relation(fields: [categoryId], references: [id])\n  provider    User          @relation(fields: [providerId], references: [id])\n  review      Review[]\n  diets       ProductDiet[]\n\n  @@unique([name, providerId, categoryId])\n  @@index([categoryId])\n  @@index([providerId])\n  @@index([isActive])\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String  @unique @db.VarChar(100)\n  slug        String  @unique @db.VarChar(100)\n  image       String?\n  description String? @db.VarChar(255)\n  isActive    Boolean @default(true)\n\n  orderCount Int?     @default(0)\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  products Product[]\n}\n\nmodel Diet {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  slug        String  @unique\n  isActive    Boolean @default(true)\n  description String? @db.VarChar(255)\n\n  products ProductDiet[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n}\n\nmodel ProductDiet {\n  productId String\n  dietId    String\n\n  product Product @relation(fields: [productId], references: [id])\n  diet    Diet    @relation(fields: [dietId], references: [id])\n\n  @@id([productId, dietId])\n  @@index([dietId])\n}\n\nmodel ProviderProfile {\n  id           String   @id @default(uuid())\n  providerId   String   @unique\n  user         User     @relation("providerProfile", fields: [providerId], references: [id])\n  name         String\n  logo         String?\n  coverImage   String?\n  description  String?\n  phone        String\n  address      String?\n  isActive     Boolean  @default(true)\n  workingHours String?\n  rating       Float    @default(0)\n  reviewCount  Int      @default(0)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  @@index([providerId])\n  @@index([id])\n}\n\nmodel Review {\n  id          String       @id @default(uuid())\n  userId      String\n  productId   String\n  description String       @db.VarChar(555)\n  status      ReviewStatus @default(APPROVED)\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  parentId    String?\n  parent      Review?      @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)\n  replies     Review[]     @relation("CommentReplies")\n  product     Product      @relation(fields: [productId], references: [id])\n  user        User         @relation(fields: [userId], references: [id])\n\n  @@unique([userId, productId])\n  @@index([productId, userId, parentId])\n}\n\nenum ReviewStatus {\n  APPROVED\n  REJECTED\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"UserCarts"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"providerProfile"},{"name":"review","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserCarts"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"product","kind":"object","type":"Product","relationName":"cartItemToProduct"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalPrice","kind":"scalar","type":"Float"},{"name":"totalQuantity","kind":"scalar","type":"Int"},{"name":"totalDiscount","kind":"scalar","type":"Float"},{"name":"grandTotal","kind":"scalar","type":"Float"},{"name":"canReturn","kind":"scalar","type":"Boolean"},{"name":"canCancel","kind":"scalar","type":"Boolean"},{"name":"cancelledAt","kind":"scalar","type":"DateTime"},{"name":"notes","kind":"scalar","type":"String"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderItemStatus"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"discount","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"description","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"ordersCount","kind":"scalar","type":"Int"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"cartItem","kind":"object","type":"CartItem","relationName":"cartItemToProduct"},{"name":"orderItem","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"provider","kind":"object","type":"User","relationName":"ProductToUser"},{"name":"review","kind":"object","type":"Review","relationName":"ProductToReview"},{"name":"diets","kind":"object","type":"ProductDiet","relationName":"ProductToProductDiet"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"orderCount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"}],"dbName":null},"Diet":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"description","kind":"scalar","type":"String"},{"name":"products","kind":"object","type":"ProductDiet","relationName":"DietToProductDiet"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"ProductDiet":{"fields":[{"name":"productId","kind":"scalar","type":"String"},{"name":"dietId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToProductDiet"},{"name":"diet","kind":"object","type":"Diet","relationName":"DietToProductDiet"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"providerProfile"},{"name":"name","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"coverImage","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"workingHours","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"reviewCount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ReviewStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Review","relationName":"CommentReplies"},{"name":"replies","kind":"object","type":"Review","relationName":"CommentReplies"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CartItemScalarFieldEnum: () => CartItemScalarFieldEnum,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DietScalarFieldEnum: () => DietScalarFieldEnum,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductDietScalarFieldEnum: () => ProductDietScalarFieldEnum,
  ProductScalarFieldEnum: () => ProductScalarFieldEnum,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Cart: "Cart",
  CartItem: "CartItem",
  Order: "Order",
  OrderItem: "OrderItem",
  Product: "Product",
  Category: "Category",
  Diet: "Diet",
  ProductDiet: "ProductDiet",
  ProviderProfile: "ProviderProfile",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartScalarFieldEnum = {
  id: "id",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId"
};
var CartItemScalarFieldEnum = {
  id: "id",
  cartId: "cartId",
  productId: "productId",
  quantity: "quantity"
};
var OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  status: "status",
  totalPrice: "totalPrice",
  totalQuantity: "totalQuantity",
  totalDiscount: "totalDiscount",
  grandTotal: "grandTotal",
  canReturn: "canReturn",
  canCancel: "canCancel",
  cancelledAt: "cancelledAt",
  notes: "notes",
  deliveryAddress: "deliveryAddress",
  phone: "phone",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  productId: "productId",
  quantity: "quantity",
  price: "price",
  status: "status"
};
var ProductScalarFieldEnum = {
  id: "id",
  name: "name",
  price: "price",
  image: "image",
  discount: "discount",
  isActive: "isActive",
  description: "description",
  views: "views",
  ordersCount: "ordersCount",
  stock: "stock",
  categoryId: "categoryId",
  providerId: "providerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  image: "image",
  description: "description",
  isActive: "isActive",
  orderCount: "orderCount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var DietScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  isActive: "isActive",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductDietScalarFieldEnum = {
  productId: "productId",
  dietId: "dietId"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  providerId: "providerId",
  name: "name",
  logo: "logo",
  coverImage: "coverImage",
  description: "description",
  phone: "phone",
  address: "address",
  isActive: "isActive",
  workingHours: "workingHours",
  rating: "rating",
  reviewCount: "reviewCount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  userId: "userId",
  productId: "productId",
  description: "description",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  parentId: "parentId"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  PARTIALLY_SHIPPED: "PARTIALLY_SHIPPED",
  SHIPPED: "SHIPPED",
  PARTIALLY_DELIVERED: "PARTIALLY_DELIVERED",
  DELIVERED: "DELIVERED",
  PARTIALLY_CANCELLED: "PARTIALLY_CANCELLED",
  CANCELLED: "CANCELLED"
};
var OrderItemStatus = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({
  adapter
});

// src/lib/auth.ts
var isProd = process.env.NODE_ENV === "production";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://foodhub-client-eta.vercel.app"
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false
  },
  session: {
    cookieCache: {
      enabled: false
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    cookieSameSite: "none",
    useSecureCookies: true
  },
  logger: {
    level: "debug",
    logger: console
  }
});

// src/modules/user/user.router.ts
import { Router } from "express";

// src/modules/user/user.service.ts
var getAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};
var userService = {
  getAllUsers
};

// src/modules/user/user.controller.ts
var getAllUsers2 = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ message: "Get all users", status: true, data: result });
  } catch (e) {
    next(e);
  }
};
var userController = {
  getAllUsers: getAllUsers2
};

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authenticated"
        });
      }
      const user = req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
        status: session.user.status
      };
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }
      if (user.status !== "ACTIVE") {
        return res.status(401).json({
          success: false,
          message: "Your account is not active. please contact support"
        });
      }
      if (roles.length && !roles.includes(user.role)) {
        return res.status(401).json({
          success: false,
          message: "Forbidden: You don't have permission to access this resource"
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  };
};
var auth_default = auth2;

// src/modules/user/user.router.ts
var router = Router();
router.get("/", auth_default("ADMIN" /* ADMIN */), userController.getAllUsers);
var userRouter = router;

// src/modules/category/category.router.ts
import { Router as Router2 } from "express";

// src/helper/normalize.ts
var normalizeName = (name, forSlug = false) => {
  let normalized = name.trim().toLowerCase();
  if (forSlug) {
    normalized = normalized.replace(/\s+/g, "-").replace(/-+/g, "-");
  }
  return normalized;
};

// src/middleware/error/app.error.ts
var AppError = class extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var app_error_default = AppError;

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const normalizedName = normalizeName(data.name);
  const slug = data.slug ? normalizeName(data.slug, true) : normalizeName(data.name, true);
  const existing = await prisma.category.findFirst({
    where: {
      OR: [{ name: { equals: normalizedName, mode: "insensitive" } }, { slug }]
    }
  });
  if (existing) {
    throw new app_error_default(
      "You already have a category with this name or slug",
      400
    );
  }
  const category = await prisma.category.create({
    data: {
      name: data.name.trim(),
      slug,
      image: data.image ?? null,
      description: data.description ?? null
    }
  });
  return category;
};
var getAllCategories = async () => {
  return prisma.category.findMany();
};
var categoryService = {
  createCategory,
  getAllCategories
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized"
      });
    }
    const data = req.body;
    const result = await categoryService.createCategory(data);
    res.status(200).json({
      message: "Category created successfully",
      status: true,
      data: result
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: e.message || "Something went wrong"
    });
  }
};
var getAllCategories2 = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      message: "Categories retrieved successfully",
      status: true,
      data: categories
    });
  } catch (e) {
    next(e);
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2
};

// src/modules/category/category.router.ts
var router2 = Router2();
router2.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */),
  categoryController.createCategory
);
router2.get("/", categoryController.getAllCategories);
var categoryRouter = router2;

// src/modules/providerProfile/provider.router.ts
import { Router as Router3 } from "express";

// src/helper/catchAsync.ts
var catchAsync = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
var catchAsync_default = catchAsync;

// src/modules/providerProfile/provider.service.ts
var createProviderProfile = async (data, user) => {
  const result = await prisma.providerProfile.create({
    data: {
      ...data,
      providerId: user.id
    }
  });
  return result;
};
var getProviderProfile = async (user) => {
  const profile = await prisma.providerProfile.findFirst({
    where: {
      providerId: user.id
    }
  });
  return profile;
};
var updateProviderProfile = async (data, user) => {
  const profile = await prisma.providerProfile.update({
    where: {
      providerId: user.id
    },
    data: {
      ...data
    }
  });
  return profile;
};
var providerProfileService = {
  createProviderProfile,
  getProviderProfile,
  updateProviderProfile
};

// src/modules/providerProfile/provider.controller.ts
var createProviderProfile2 = catchAsync_default(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new app_error_default("Unauthorized", 401);
    const existingProfile = await prisma.providerProfile.findFirst({
      where: {
        providerId: user.id
      }
    });
    if (existingProfile) {
      throw new app_error_default("Provider profile already exists", 400);
    }
    const data = req.body;
    if (!data.name || !data.phone) {
      throw new app_error_default("Name and phone are required", 400);
    }
    const result = await providerProfileService.createProviderProfile(
      data,
      user
    );
    res.status(201).json({
      status: true,
      message: "Provider profile created successfully",
      data: result
    });
  }
);
var getProviderProfile2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) throw new app_error_default("Unauthorized", 401);
  const profile = await providerProfileService.getProviderProfile(user);
  if (!profile) {
    throw new app_error_default("Provider profile not found", 404);
  }
  res.status(200).json({
    status: true,
    message: "Provider profile retrieved successfully",
    data: profile
  });
});
var updateProviderProfile2 = catchAsync_default(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new app_error_default("Unauthorized", 401);
    const data = req.body;
    const updatedProfile = await providerProfileService.updateProviderProfile(
      data,
      user
    );
    res.status(200).json({
      status: true,
      message: "Provider profile updated successfully",
      data: updatedProfile
    });
  }
);
var providerProfileController = {
  createProviderProfile: createProviderProfile2,
  getProviderProfile: getProviderProfile2,
  updateProviderProfile: updateProviderProfile2
};

// src/modules/providerProfile/provider.router.ts
var router3 = Router3();
router3.post(
  "/",
  auth_default("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  providerProfileController.createProviderProfile
);
router3.get(
  "/",
  auth_default("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  providerProfileController.getProviderProfile
);
router3.put(
  "/",
  auth_default("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  providerProfileController.updateProviderProfile
);
var providerProfileRouter = router3;

// src/modules/product/product.router.ts
import { Router as Router4 } from "express";

// src/helper/queryBuilder.ts
var QueryBuilder = class {
  constructor(model, queryParams, config2 = {}) {
    this.model = model;
    this.queryParams = queryParams;
    this.config = config2;
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10
    };
    this.countQuery = {
      where: {}
    };
  }
  query;
  countQuery;
  page = 1;
  limit = 20;
  skip = 0;
  sortBy = "createdAt";
  sortOrder = "desc";
  selectFields;
  search() {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions = [];
      searchableFields.forEach((field) => {
        if (field.includes(".")) {
          const parts = field.split(".");
          if (parts.length === 2) {
            const [relation, nestedField] = parts;
            const stringFilter2 = {
              contains: searchTerm,
              mode: "insensitive"
            };
            if (relation && nestedField) {
              searchConditions.push({
                [relation]: {
                  [nestedField]: stringFilter2
                }
              });
            }
            return;
          } else if (parts.length === 3) {
            const [relation, nestedRelation, nestedField] = parts;
            const stringFilter2 = {
              contains: searchTerm,
              mode: "insensitive"
            };
            if (relation && nestedRelation && nestedField) {
              searchConditions.push({
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter2
                    }
                  }
                }
              });
            }
            return;
          }
        }
        const lower = field.toLowerCase();
        if (lower.includes("date") || lower.includes("time")) {
          const parsed = Date.parse(searchTerm);
          if (!isNaN(parsed)) {
            searchConditions.push({ [field]: new Date(parsed) });
          }
          return;
        }
        if (!isNaN(Number(searchTerm))) {
          searchConditions.push({ [field]: Number(searchTerm) });
          return;
        }
        const stringFilter = {
          contains: searchTerm,
          mode: "insensitive"
        };
        searchConditions.push({ [field]: stringFilter });
      });
      const whereConditions = this.query.where;
      whereConditions.OR = searchConditions;
      const countWhereConditions = this.countQuery.where;
      countWhereConditions.OR = searchConditions;
    }
    return this;
  }
  select(select) {
    this.query.select = select;
    this.selectFields = select;
    delete this.query.include;
    return this;
  }
  // /doctors?searchTerm=john&page=1&sortBy=name&specialty=cardiology&appointmentFee[lt]=100 => {}
  // { specialty: 'cardiology', appointmentFee: { lt: '100' } }
  filter() {
    const { filterableFields } = this.config;
    const excludedField = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "fields",
      "include"
    ];
    const filterParams = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedField.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });
    const queryWhere = this.query.where;
    const countQueryWhere = this.countQuery.where;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      if (value === void 0 || value === "" || value === null) return;
      const isAllowedField = !filterableFields || filterableFields.length === 0 || filterableFields.includes(key);
      if (!isAllowedField) return;
      if (key.includes(".")) {
        const parts = key.split(".");
        const levels = parts.length;
        if (levels < 2 || levels > 3) return;
        const [relation, nestedRelationOrField, nestedField] = parts;
        if (levels === 2 && relation && nestedRelationOrField) {
          if (!queryWhere[relation]) queryWhere[relation] = {};
          if (!countQueryWhere[relation]) countQueryWhere[relation] = {};
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          queryRelation[nestedRelationOrField] = this.parseFilterValue(value);
          countRelation[nestedRelationOrField] = this.parseFilterValue(value);
          return;
        }
        if (levels === 3 && relation && nestedRelationOrField && nestedField) {
          if (!queryWhere[relation]) queryWhere[relation] = { some: {} };
          if (!countQueryWhere[relation])
            countQueryWhere[relation] = { some: {} };
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          if (!queryRelation.some) queryRelation.some = {};
          if (!countRelation.some) countRelation.some = {};
          const querySome = queryRelation.some;
          const countSome = countRelation.some;
          if (!querySome[nestedRelationOrField])
            querySome[nestedRelationOrField] = {};
          if (!countSome[nestedRelationOrField])
            countSome[nestedRelationOrField] = {};
          const queryNested = querySome[nestedRelationOrField];
          const countNested = countSome[nestedRelationOrField];
          queryNested[nestedField] = this.parseFilterValue(value);
          countNested[nestedField] = this.parseFilterValue(value);
          return;
        }
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queryWhere[key] = this.parseRangeFilter(
          value
        );
        countQueryWhere[key] = this.parseRangeFilter(
          value
        );
        return;
      }
      queryWhere[key] = this.parseFilterValue(value);
      countQueryWhere[key] = this.parseFilterValue(value);
    });
    return this;
  }
  paginate() {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || this.limit;
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
    this.query.skip = this.skip;
    this.query.take = this.limit;
    return this;
  }
  sort() {
    const sortBy = this.queryParams.sortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    if (sortBy.includes(".")) {
      const parts = sortBy.split(".");
      if (parts.length === 2) {
        const [relation, nestedField] = parts;
        if (relation && nestedField) {
          this.query.orderBy = {
            [relation]: {
              [nestedField]: sortOrder
            }
          };
        }
      } else if (parts.length === 3) {
        const [relation, nestedRelation, nestedField] = parts;
        if (relation && nestedRelation && nestedField) {
          this.query.orderBy = {
            [relation]: {
              [nestedRelation]: {
                [nestedField]: sortOrder
              }
            }
          };
        }
      } else {
        this.query.orderBy = {
          [sortBy]: sortOrder
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder
      };
    }
    return this;
  }
  fields() {
    const fieldsParam = this.queryParams.fields;
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam?.split(",").map((field) => field.trim());
      this.selectFields = {};
      fieldsArray?.forEach((field) => {
        if (this.selectFields) {
          this.selectFields[field] = true;
        }
      });
      this.query.select = this.selectFields;
      delete this.query.include;
    }
    return this;
  }
  include(relation) {
    if (this.selectFields) {
      return this;
    }
    this.query.include = {
      ...this.query.include,
      ...relation
    };
    return this;
  }
  dynamicInclude(includeConfig, defaultInclude) {
    if (this.selectFields) {
      return this;
    }
    const result = {};
    defaultInclude?.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });
    const includeParam = this.queryParams.include;
    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam.split(",").map((relation) => relation.trim());
      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }
    this.query.include = {
      ...this.query.include,
      ...result
    };
    return this;
  }
  where(condition) {
    this.query.where = this.deepMerge(
      this.query.where,
      condition
    );
    this.countQuery.where = this.deepMerge(
      this.countQuery.where,
      condition
    );
    return this;
  }
  async execute() {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery
      ),
      this.model.findMany(
        this.query
      )
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages
      }
    };
  }
  async count() {
    return await this.model.count(
      this.countQuery
    );
  }
  getQuery() {
    return this.query;
  }
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
          result[key] = this.deepMerge(
            result[key],
            source[key]
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  parseFilterValue(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }
    return value;
  }
  parseRangeFilter(value) {
    const rangeQuery = {};
    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];
      const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;
        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });
    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
};

// src/modules/product/product.service.ts
var createProduct = async (data, user) => {
  const { diets, ...productData } = data;
  let dietIds = [];
  if (diets && diets.length > 0) {
    if (!Array.isArray(diets))
      throw new app_error_default("diets must be an array of ids", 400);
    const uniqueDietIds = Array.from(new Set(diets));
    const existingDiets = await prisma.diet.findMany({
      where: { id: { in: uniqueDietIds } },
      select: { id: true }
    });
    if (existingDiets.length !== uniqueDietIds.length) {
      throw new app_error_default("One or more diet ids are invalid", 400);
    }
    dietIds = uniqueDietIds;
  }
  const productWithDiets = await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        ...productData,
        providerId: user.id
      }
    });
    if (dietIds.length > 0) {
      await tx.productDiet.createMany({
        data: dietIds.map((dietId) => ({
          productId: product.id,
          dietId
        })),
        skipDuplicates: true
      });
    }
    const p = await tx.product.findUnique({
      where: { id: product.id },
      include: {
        category: { select: { id: true, name: true } },
        provider: { select: { id: true, name: true } },
        diets: {
          include: {
            diet: { select: { id: true, name: true } }
          }
        }
      }
    });
    return p;
  });
  return productWithDiets;
};
var getAllProducts = async (query) => {
  const queryBuilder = new QueryBuilder(prisma.product, query, {
    searchableFields: ["name", "category.name"],
    filterableFields: ["categoryId"]
  });
  const result = await queryBuilder.filter().where({ isActive: true }).include({
    diets: { include: { diet: { select: { name: true, id: true } } } },
    category: { select: { name: true, id: true } }
  }).search().paginate().sort().execute();
  const formattedData = result.data.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.image,
    description: p.description,
    stock: p.stock,
    category: p.category?.name || "Uncategorized",
    categoryId: p.categoryId,
    diets: p.diets.map((d) => ({
      id: d.diet.id,
      name: d.diet.name
    }))
  }));
  return {
    data: formattedData,
    meta: result.meta
  };
};
var getProductById = async (id) => {
  const data = await prisma.product.findUnique({
    where: { id },
    include: {
      diets: {
        include: {
          diet: {
            select: {
              name: true,
              id: true
            }
          }
        }
      },
      category: {
        select: {
          name: true,
          id: true
        }
      },
      provider: {
        select: {
          name: true
        }
      }
    }
  });
  return data;
};
var getOwnProduct = async (user, query) => {
  const queryBuilder = new QueryBuilder(prisma.product, query, {
    searchableFields: ["name", "category.name"],
    filterableFields: ["categoryId"]
  });
  return await queryBuilder.filter().where({
    isActive: true,
    providerId: user.id
  }).include({
    diets: {
      include: {
        diet: {
          select: {
            name: true,
            id: true
          }
        }
      }
    },
    category: {
      select: {
        name: true,
        id: true
      }
    }
  }).search().paginate().sort().execute();
};
var productService = {
  createProduct,
  getAllProducts,
  getProductById,
  getOwnProduct
};

// src/helper/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data, meta } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/modules/product/product.controller.ts
import { StatusCodes } from "http-status-codes";
var createProduct2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) throw new app_error_default("Unauthorized", 401);
  const {
    name,
    categoryId,
    price,
    image,
    description,
    isActive,
    discount,
    stock,
    diets
  } = req.body;
  if (!name || !categoryId || price === void 0 || price === null || !image) {
    throw new app_error_default("name, categoryId, price and image are required", 400);
  }
  if (typeof price !== "number" || Number.isNaN(price)) {
    throw new app_error_default("price must be a number", 400);
  }
  if (discount !== void 0 && discount !== null && typeof discount !== "number") {
    throw new app_error_default("discount must be a number", 400);
  }
  if (stock !== void 0 && stock !== null && typeof stock !== "number") {
    throw new app_error_default("stock must be a number", 400);
  }
  if (isActive !== void 0 && isActive !== null && typeof isActive !== "boolean") {
    throw new app_error_default("isActive must be a boolean", 400);
  }
  const data = {
    name,
    categoryId,
    price,
    image,
    description: description ?? null,
    discount: discount ?? null,
    isActive: isActive ?? true,
    stock: stock ?? void 0,
    diets: Array.isArray(diets) ? diets : void 0
  };
  const result = await productService.createProduct(data, user);
  res.status(201).json({
    status: "success",
    data: result
  });
});
var getAllProducts2 = catchAsync_default(async (req, res) => {
  const query = req.query;
  const products = await productService.getAllProducts(query);
  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: products.data,
    meta: products.meta,
    success: true,
    message: "Product fetched successfully"
  });
});
var getOwnProduct2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  const query = req.query;
  if (!user) throw new app_error_default("Unauthorized", 401);
  const products = await productService.getOwnProduct(
    user,
    query
  );
  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: products,
    success: true,
    message: "Product fetched successfully"
  });
});
var getProductById2 = catchAsync_default(async (req, res) => {
  const id = req.params.id;
  const product = await productService.getProductById(id);
  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: product,
    success: true,
    message: "Product fetched successfully"
    // meta:pr
  });
});
var productController = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  getOwnProduct: getOwnProduct2,
  getProductById: getProductById2
};

// src/modules/product/product.router.ts
var router4 = Router4();
router4.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */),
  productController.createProduct
);
router4.get("/", productController.getAllProducts);
router4.get(
  "/my-products",
  auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */, "CUSTOMER" /* CUSTOMER */),
  productController.getOwnProduct
);
router4.get(
  "/:id",
  productController.getProductById
);
var productRouter = router4;

// src/modules/diets/diets.router.ts
import { Router as Router5 } from "express";

// src/modules/diets/diets.service.ts
var createDiet = async (data) => {
  const normalizedName = normalizeName(data.name);
  const slug = data.slug ? normalizeName(data.slug, true) : normalizeName(data.name, true);
  const existing = await prisma.diet.findFirst({
    where: {
      OR: [{ name: { equals: normalizedName, mode: "insensitive" } }, { slug }]
    }
  });
  if (existing) {
    throw new app_error_default(
      "You already have a diet with this name or slug",
      400
    );
  }
  const category = await prisma.diet.create({
    data: {
      ...data,
      name: data.name.trim(),
      slug
    }
  });
  return category;
};
var getAllDiets = async () => {
  return prisma.diet.findMany();
};
var dietService = {
  createDiet,
  getAllDiets
};

// src/modules/diets/diets.controller.ts
var createDiet2 = catchAsync_default(async (req, res) => {
  const data = req.body;
  const diet = await dietService.createDiet(data);
  res.status(201).json({
    status: "success",
    data: {
      diet
    }
  });
});
var getAllDiets2 = catchAsync_default(async (req, res) => {
  const diets = await dietService.getAllDiets();
  res.status(200).json({
    status: "success",
    results: diets.length,
    data: diets
  });
});
var dietController = {
  createDiet: createDiet2,
  getAllDiets: getAllDiets2
};

// src/modules/diets/diets.router.ts
var router5 = Router5();
router5.post("/", dietController.createDiet);
router5.get("/", dietController.getAllDiets);
var dietRouter = router5;

// src/modules/order/order.router.ts
import { Router as Router6 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (data, user) => {
  const { items, deliveryAddress, phone, notes } = data;
  if (!items || items.length === 0) {
    throw new app_error_default("Order must contain at least one item", 400);
  }
  const normalizedItems = items.map((item) => {
    const productId = item.productId;
    const quantity = Number(item.quantity);
    if (!productId || Number.isNaN(quantity)) {
      throw new app_error_default("Invalid item data", 400);
    }
    if (quantity < 1) {
      throw new app_error_default("Item quantity must be at least 1", 400);
    }
    return { productId, quantity };
  });
  const productIds = [...new Set(normalizedItems.map((i) => i.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });
  if (products.length !== productIds.length) {
    throw new app_error_default("One or more product ids are invalid", 400);
  }
  const productMap = new Map(products.map((p) => [p.id, p]));
  let totalPrice = 0;
  let totalQuantity = 0;
  let totalDiscount = 0;
  const finalItems = normalizedItems.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new app_error_default("Product not found", 400);
    }
    if (product.stock < item.quantity) {
      throw new app_error_default(
        `Insufficient stock for product: ${product.name}`,
        400
      );
    }
    const price = Number(product.price);
    totalPrice += price * item.quantity;
    totalQuantity += item.quantity;
    return {
      productId: product.id,
      quantity: item.quantity,
      price
    };
  });
  const grandTotal = totalPrice - totalDiscount;
  const order = await prisma.$transaction(async (tx) => {
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
          create: finalItems
        }
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
                providerId: true
              }
            }
          }
        }
      }
    });
    for (const item of finalItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }
    return createdOrder;
  });
  return order;
};
var getAllOrdersByuser = async (user) => {
  const orders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          product: {
            providerId: user.id
          }
        }
      }
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
              providerId: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return orders;
};
var calculateOrderStatus = (itemStatuses) => {
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
var updateOrderStatusSimple = async (orderId, status, user) => {
  if (!Object.values(OrderItemStatus).includes(status)) {
    throw new app_error_default("Invalid status", 400);
  }
  const newStatus = status;
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: { providerId: true }
            }
          }
        }
      }
    });
    if (!order) {
      throw new app_error_default("Order not found", 404);
    }
    const role = user.role;
    if (role === "CUSTOMER" /* CUSTOMER */ && order.userId !== user.id) {
      throw new app_error_default("Forbidden", 403);
    }
    if (role === "PROVIDER" /* PROVIDER */) {
      const hasAccess = order.items.some(
        (item) => item.product.providerId === user.id
      );
      if (!hasAccess) {
        throw new app_error_default("Forbidden", 403);
      }
    }
    const invalidStatuses = [
      OrderItemStatus.DELIVERED,
      OrderItemStatus.CANCELLED,
      OrderItemStatus.RETURNED
    ];
    const updatableItems = order.items.filter(
      (item) => !invalidStatuses.includes(item.status)
    );
    if (updatableItems.length === 0) {
      throw new app_error_default("No items can be updated", 400);
    }
    const allowedTransitions = {
      [OrderItemStatus.PLACED]: [
        OrderItemStatus.PROCESSING,
        OrderItemStatus.CANCELLED
      ],
      [OrderItemStatus.PROCESSING]: [
        OrderItemStatus.SHIPPED,
        OrderItemStatus.CANCELLED
      ],
      [OrderItemStatus.SHIPPED]: [
        OrderItemStatus.DELIVERED,
        OrderItemStatus.RETURNED
      ],
      [OrderItemStatus.DELIVERED]: [],
      [OrderItemStatus.CANCELLED]: [],
      [OrderItemStatus.RETURNED]: []
    };
    for (const item of updatableItems) {
      const current = item.status;
      if (current !== newStatus) {
        const allowed = allowedTransitions[current] || [];
        if (!allowed.includes(newStatus)) {
          throw new app_error_default(
            `Invalid transition from ${current} to ${newStatus}`,
            400
          );
        }
      }
      await tx.orderItem.update({
        where: { id: item.id },
        data: { status: newStatus }
      });
    }
    const updatedItems = await tx.orderItem.findMany({
      where: { orderId },
      select: { status: true }
    });
    const itemStatuses = updatedItems.map(
      (i) => i.status
    );
    const newOrderStatus = calculateOrderStatus(itemStatuses);
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: newOrderStatus },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    return updatedOrder;
  });
};
var orderService = {
  createOrder,
  getAllOrdersByuser,
  updateOrderStatusSimple
};

// src/modules/order/order.controller.ts
var createOrder2 = catchAsync_default(async (req, res) => {
  const data = req.body;
  const user = req.user;
  if (!user) {
    throw new app_error_default("Unauthorized", 401);
  }
  if (!data || !Array.isArray(data.items) || data.items.length === 0) {
    throw new app_error_default("Order must contain at least one item", 400);
  }
  const result = await orderService.createOrder(data, user);
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: result
  });
});
var getOrdersByUserId = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new app_error_default("Unauthorized", 401);
  }
  const result = await orderService.getAllOrdersByuser(user);
  res.status(200).json({
    success: true,
    data: result
  });
});
var updateOrderStatus = catchAsync_default(async (req, res) => {
  const status = req.params.status;
  const orderId = req.params.orderId;
  const productId = req.params.productId;
  const user = req.user;
  if (!user) {
    throw new app_error_default("Unauthorized", 401);
  }
  if (!status || !orderId || !productId) {
    throw new app_error_default("Missing parameters", 400);
  }
  const result = await orderService.updateOrderStatusSimple(orderId, status, user);
  res.status(200).json({
    success: true,
    message: "Order item status updated successfully",
    data: result
  });
});
var orderController = {
  createOrder: createOrder2,
  getOrdersByUserId,
  updateOrderStatus
};

// src/modules/order/order.router.ts
var router6 = Router6();
router6.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */),
  orderController.createOrder
);
router6.get(
  "/",
  auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */, "CUSTOMER" /* CUSTOMER */),
  orderController.getOrdersByUserId
);
router6.patch(
  "/:orderId/status",
  auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */, "CUSTOMER" /* CUSTOMER */),
  orderController.updateOrderStatus
);
var orderRouter = router6;

// src/modules/cart/cart.route.ts
import { Router as Router7 } from "express";

// src/modules/cart/cart.service.ts
var addToCart = async (payload, user) => {
  const userId = user.id || user._id;
  if (!userId) throw new Error("User ID is missing");
  const validUser = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!validUser) throw new Error("User not found");
  return await prisma.$transaction(async (tx) => {
    let cart = await tx.cart.findFirst({
      where: { userId }
    });
    if (!cart) {
      cart = await tx.cart.create({
        data: { userId }
      });
    }
    const productIds = payload.map((item) => {
      if (!item.productId) {
        throw new app_error_default("Each item must have a valid productId");
      }
      return item.productId;
    });
    const existingItems = await tx.cartItem.findMany({
      where: {
        cartId: cart.id,
        productId: { in: productIds }
      }
    });
    if (existingItems.length > 0) {
      throw new app_error_default("One or more products already exist in your cart");
    }
    return await tx.cartItem.createMany({
      data: payload.map((item) => ({
        cartId: cart.id,
        productId: item.productId,
        quantity: Number(item.quantity)
      }))
    });
  });
};
var getCartItems = async (user) => {
  const whereCondition = {
    cart: {
      user: {
        id: user.id
      }
    }
  };
  const [items, totalCount] = await Promise.all([
    prisma.cartItem.findMany({
      where: whereCondition,
      include: {
        product: {
          select: {
            name: true,
            image: true,
            id: true,
            price: true
          }
        }
      }
    }),
    prisma.cartItem.count({
      where: whereCondition
    })
  ]);
  return {
    items,
    totalCount
  };
};
var deleteCartItem = async (cartItemId, user) => {
  const cartId = await prisma.cart.findUnique({
    where: {
      userId: user.id
    },
    select: {
      id: true
    }
  });
  if (!cartId) throw new Error("User does not have a cart");
  const isYourCartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cartId: cartId.id
    }
  });
  if (!isYourCartItem) throw new Error("This cart item does not belong to you");
  return await prisma.cartItem.delete({
    where: {
      id: cartItemId
    }
  });
};
var cartService = {
  addToCart,
  getCartItems,
  deleteCartItem
};

// src/modules/cart/cart.controller.ts
import { StatusCodes as StatusCodes2 } from "http-status-codes";
var addToCart2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new app_error_default("Unauthorized", 401);
  }
  const data = req.body;
  const result = await cartService.addToCart(data, user);
  res.status(201).json({
    success: true,
    message: "Product added to cart successfully",
    data: result
  });
});
var getCartItems2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new app_error_default("Unauthorized", 401);
  }
  const result = await cartService.getCartItems(user);
  res.status(200).json({
    success: true,
    message: "Cart items fetched successfully",
    data: result
  });
});
var deleteCartItem2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new app_error_default("Unauthorized", 401);
  }
  const result = await cartService.deleteCartItem(
    req.params.cartItemId,
    user
  );
  sendResponse(res, {
    httpStatusCode: StatusCodes2.OK,
    data: result,
    success: true,
    message: "Cart item deleted successfully"
  });
});
var cartController = {
  addToCart: addToCart2,
  getCartItems: getCartItems2,
  deleteCartItem: deleteCartItem2
};

// src/modules/cart/cart.route.ts
var router7 = Router7();
router7.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */),
  cartController.addToCart
);
router7.get(
  "/",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */),
  cartController.getCartItems
);
router7.delete(
  "/:cartItemId",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */),
  cartController.deleteCartItem
);
var cartRouter = router7;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/middleware/error/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  if (err instanceof app_error_default) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
      // REAL MESSAGE
    });
  }
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provided an incorrect field type or missing fields.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    const code = err.code;
    switch (code) {
      case "P2025":
        statusCode = 404;
        errorMessage = "Record not found or already deleted.";
        break;
      case "P2002":
        statusCode = 409;
        errorMessage = "Duplicate value detected. This record already exists.";
        break;
      case "P2003":
        statusCode = 400;
        errorMessage = "Invalid reference. Related record does not exist.";
        break;
      case "P2001":
        statusCode = 404;
        errorMessage = "Requested record does not exist.";
        break;
      case "P2000":
        statusCode = 400;
        errorMessage = "Input value is too long for this field.";
        break;
      case "P2004":
        statusCode = 400;
        errorMessage = "A database constraint failed.";
        break;
      case "P2005":
        statusCode = 500;
        errorMessage = "Database query failed. Please try again later.";
        break;
      case "P2009":
        statusCode = 400;
        errorMessage = "Failed to validate query or value.";
        break;
      case "P2011":
        statusCode = 400;
        errorMessage = "Required field is missing or contains null value.";
        break;
      case "P2014":
        statusCode = 400;
        errorMessage = "Invalid relation. This operation violates a required relation.";
        break;
      case "P2016":
        statusCode = 400;
        errorMessage = "Query interpretation error. Please check request data.";
        break;
      case "P2022":
        statusCode = 400;
        errorMessage = "The operation attempted is not allowed on this Prisma model.";
        break;
      case "P2034":
        statusCode = 409;
        errorMessage = "Transaction failed due to a write conflict. Please retry.";
        break;
      default:
        statusCode = 400;
        errorMessage = `${err.message || "Database error"} (${code})`;
    }
    errorDetails = {
      code: err.code,
      meta: err.meta ?? null,
      message: err.message
    };
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    console.error("Prisma Unknown Error:", err);
    statusCode = 500;
    errorMessage = "Unexpected database error occurred. Please try again later.";
    errorDetails = { message: err.message };
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    console.error("Prisma Initialization Error:", err);
    statusCode = 500;
    errorMessage = "Database service is temporarily unavailable. Please try again later.";
    errorDetails = { message: err.message };
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        process.env.App_URL,
        "https://foodhub-client-eta.vercel.app"
      ];
      const isVercelPreview = origin && origin.includes(".vercel.app");
      if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/providerProfile", providerProfileRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/diets", dietRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("FoodHub Backend is running");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
