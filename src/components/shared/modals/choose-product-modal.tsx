'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {IProductItem} from "../../../../@types/product";
import {useCartStore} from "../../../store/cart";
import {Dialog} from "../../ui";
import {DialogContent} from "../../ui/dialog";
import {ChoosePizzaForm} from "../choose-pizza-form";
import {ChooseProductForm} from "../choose-product-form";


type PropsType = {
    product: IProductItem
    className?: string;
}
export const ChooseProductModal: React.FC<PropsType> = ({product}) => {



    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);
    const firstItem = product.items[0];

    const onCloseModal = () => {
        router.back();
    };
    const addCartItem = useCartStore(state => state.addCartItem);

    const onAddProduct = async () => {
        try {
            await addCartItem({
                productId: firstItem.id,
            });
        } catch (error) {
            console.error(error);
        }
        onCloseModal();
    }



    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
                {
                    isPizzaForm ?
                        <ChoosePizzaForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            items={product.items}
                            onClickAdd={onAddPizza}/>
                        :
                        <ChooseProductForm imageUrl={product.imageUrl} name={product.name}/>
                }

            </DialogContent>
        </Dialog>
    );
};
