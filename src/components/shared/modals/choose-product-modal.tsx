'use client';

import React from 'react';
import {Dialog} from "../../ui";
import {DialogContent} from "../../ui/dialog";
import {ChooseProductForm} from "../choose-product-form";
import {IProductItem} from "../../../../@types/product";
import {ChoosePizzaForm} from "../choose-pizza-form";
import {useCartStore} from "../../../store/cart";
import {router} from "next/client";


type PropsType = {
    product: IProductItem
    className?: string;
}

export const ChooseProductModal: React.FC<PropsType> = ({product}) => {

    const isPizzaForm = Boolean(product.items[0].pizzaType);
    const addCartItem  = useCartStore(state => state.addCartItem);
    const loading = useCartStore(state => state.loading);
    const firstItem = product.items?.[0];

    const onAddPizza = (productItemId: number, ingredients: number[]) => {
        addCartItem({
            productItemId,
            ingredients
        });
    }

    const onAddProduct = () => {
        addCartItem({
            productItemId : firstItem.id,
        });
    }

    const onClose = () =>  {
        router.back()
    }

    return (
        <Dialog open={Boolean(product)} >
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
                {
                    isPizzaForm ?
                        <
                            ChoosePizzaForm
                            onSubmit={onAddPizza}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            items={product.items}
                            loading={loading}
                            onClose={onClose}
                        />

                        :
                        <ChooseProductForm
                            onSubmit={onAddProduct}
                            price={firstItem.price}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            loading={loading}
                            onClose={onClose}
                        />
                }
            </DialogContent>
        </Dialog>
    );
};
