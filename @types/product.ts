import type { Ingredient, Product, ProductItem } from '@prisma/client';

export type IProductItem = Product & { items: ProductItem[]; ingredients: Ingredient[] };

