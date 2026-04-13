/*
  Warnings:

  - A unique constraint covering the columns `[name,providerId,categoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_name_providerId_categoryId_key" ON "Product"("name", "providerId", "categoryId");
