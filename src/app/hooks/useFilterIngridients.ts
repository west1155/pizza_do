import {Ingredient} from "@prisma/client";
import React from "react";


type ReturnProps = {
    items: Ingredient[];
}

export const useFilterIngridients = (): ReturnProps => {
    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients =
            }
            catch (e) {
                console.error(e);
            }
        }


        fetchIngredients();
    }
};