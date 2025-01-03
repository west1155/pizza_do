'use client';
import { Ingredient } from "@prisma/client";
import React from "react";
import { apiClient } from "../../../services/api-client";
import { useSet } from "react-use";

type ReturnProps = {
    ingredients: Pick<Ingredient, "id" | "name">[];
    selectedIds: Set<string>;
    addId: (id: string) => void;
};

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Pick<Ingredient, "id" | "name">[]>([]);
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
    };
};
