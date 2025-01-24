'use client';
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";
import {apiClient} from "@/services/api-client";

type ReturnProps = {
    ingredients: Pick<Ingredient, "id" | "name">[];
    selectedIds: Set<string>;
    addId: (id: string) => void;
    price: PriceProps;
    setPrice: React.Dispatch<React.SetStateAction<PriceProps>>;
};


export type PriceProps = {
    priceFrom: number;
    priceTo: number;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Pick<Ingredient, "id" | "name">[]>([]);
    const [price, setPrice] = React.useState<PriceProps>({priceFrom: 0, priceTo: 150});
    const [selectedIds, { toggle }] = useSet(new Set<string>());

    React.useEffect(() => {
        apiClient.ingredients.getAll()
            .then((data: Pick<Ingredient, "id" | "name">[]) => {
                setIngredients(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const addId = (id: string) => {
        toggle(id);
    };

    return {
        ingredients,
        selectedIds,
        addId,
        price, setPrice
    };
};
