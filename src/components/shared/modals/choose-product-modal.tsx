'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {Dialog} from "../../ui";
import {DialogContent} from "../../ui/dialog";
import {ChooseProductForm} from "../choose-product-form";
import {IProductItem} from "../../../../@types/product";
import {ChoosePizzaForm} from "../choose-pizza-form";
import {useCartStore} from "../../../store/cart";


type PropsType = {
    product: IProductItem
    className?: string;
}

export const ChooseProductModal: React.FC<PropsType> = ({product}) => {

    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);
    const addCartItem = useCartStore(state => state.addCartItem);
    const firstItem = product.items?.[0];

    const onCloseModal = () => {
        router.back();
    };

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

    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
                {
                    isPizzaForm ?
                        <
                            ChoosePizzaForm
                            onClose={onCloseModal}
                            onSubmit={onAddPizza}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            items={product.items}/>

                        :
                        <ChooseProductForm
                            onClose={onCloseModal}
                            onSubmit={onAddProduct}
                            price={firstItem.price}
                            imageUrl={product.imageUrl}
                            name={product.name}
                        />
                }

            </DialogContent>
        </Dialog>
    );
};
