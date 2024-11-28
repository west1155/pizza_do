'use client';
import { Ingredient } from "@prisma/client";
import React from "react";
import { apiClient } from "@/services/api-client";

type ReturnProps = Pick<Ingredient, "id" | "name" | "price">[];

export const useFilterIngridients = (): ReturnProps => {
    const [items, setItems] = React.useState<ReturnProps>([]);

    React.useEffect(() => {
        apiClient.ingridients.getAll()
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return items;
};