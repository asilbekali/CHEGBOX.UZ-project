/*
  Warnings:

  - The values [SALLER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Elon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountAmount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN', 'SELLER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Elon" DROP CONSTRAINT "Elon_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Elon" DROP CONSTRAINT "Elon_productId_fkey";

-- DropForeignKey
ALTER TABLE "Elon" DROP CONSTRAINT "Elon_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "discountAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountType" TEXT NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "newPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "oldPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Elon";

-- DropTable
DROP TABLE "city";

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
