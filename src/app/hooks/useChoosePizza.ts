import React from 'react';
import { useSet } from 'react-use';
import { Ingredient, Product, ProductItem } from '@prisma/client';
import {PizzaSize} from '../lib/pizza-details-to-text';

export type IProduct = Product & { items: ProductItem[]; ingredients: Ingredient[] };

export const useChoosePizza = (items?: IProduct['items']) => {
    const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));

    const [size, setSize] = React.useState<PizzaSize>(20);


    const setPizzaSize = (value: number | string) => {
        setSize(Number(value) as PizzaSize);
    };

    return {
        setPizzaSize,
        size,
        selectedIngredientsIds,
        toggleAddIngredient,
    };
};
