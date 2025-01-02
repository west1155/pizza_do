'use client';
import { Ingredient } from "@prisma/client";
import React from "react";
import { apiClient } from "../../../services/api-client";

type ReturnProps = Pick<Ingredient, "id" | "name">[];
export const useFilterIngridients = (): ReturnProps => {
    const [ingredients, setItems] = React.useState<ReturnProps>([]);

    React.useEffect(() => {
        apiClient.ingredients.getAll()
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    console.log(ingredients)
    return ingredients;
};