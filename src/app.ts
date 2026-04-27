import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { userRouter } from "./modules/user/user.router.js";
import { categoryRouter } from "./modules/category/category.router.js";
import { providerProfileRouter } from "./modules/providerProfile/provider.router.js";
import { productRouter } from "./modules/product/product.router.js";
import { dietRouter } from "./modules/diets/diets.router.js";
import { orderRouter } from "./modules/order/order.router.js";
import { cartRouter } from "./modules/cart/cart.route.js";
import { notFound } from "./middleware/notFound.js";
import errorHandler from "./middleware/error/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import { envVariables } from "./config/env.js";

const app: Application = express();

app.use(cookieParser());

const allowedOrigins = [
  envVariables.APP_URL || "http://localhost:3000",
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
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
app.use(errorHandler);
export default app;
