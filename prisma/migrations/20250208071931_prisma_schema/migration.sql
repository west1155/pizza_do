/*
  Warnings:

  - The `size` column on the `ProductItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pizzaType` column on the `ProductItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER,
DROP COLUMN "pizzaType",
ADD COLUMN     "pizzaType" INTEGER;
