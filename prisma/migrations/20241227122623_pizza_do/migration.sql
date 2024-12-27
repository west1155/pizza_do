-- AlterTable
ALTER TABLE "ProductItem" ALTER COLUMN "pizzaType" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CartItemToIngredient" ADD CONSTRAINT "_CartItemToIngredient_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CartItemToIngredient_AB_unique";

-- AlterTable
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_IngredientToProduct_AB_unique";
