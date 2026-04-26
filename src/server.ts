import app from "./app.js";
import { envVariables } from "./config/env.js";

const port = envVariables.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  console.log("SIGINT received");
  server.close(() => process.exit(0));
});

// safe logging only (NO EXIT)
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
});