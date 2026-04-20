import { Server } from "http";
import app from "./app";

let server: Server;

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", () => {
  console.log("SIGTERM received");

  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }
});

process.on("SIGINT", () => {
  console.log("SIGINT received");

  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// comment

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

bootstrap().catch((err) => {
  console.error("Bootstrap failed:", err);
  process.exit(1);
});