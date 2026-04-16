import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = Number(process.env.PORT) || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on", PORT);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
