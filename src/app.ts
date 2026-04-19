import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { userRouter } from "./modules/user/user.router";
import { categoryRouter } from "./modules/category/category.router";
import { providerProfileRouter } from "./modules/providerProfile/provider.router";
import { productRouter } from "./modules/product/product.router";
import { dietRouter } from "./modules/diets/diets.router";
import { orderRouter } from "./modules/order/order.router";
import { cartRouter } from "./modules/cart/cart.route";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/error/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        process.env.App_URL,
        "https://foodhub-client-eta.vercel.app",
      ];

      const isVercelPreview = origin && origin.includes(".vercel.app");

      if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
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
