'use client';

import React from 'react';
import {Dialog} from "../../ui";
import {DialogContent} from "../../ui/dialog";
import {ChooseProductForm} from "../choose-product-form";
import {IProductItem} from "../../../../@types/product";
import {ChoosePizzaForm} from "../choose-pizza-form";
import {useCartStore} from "../../../store/cart";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

type PropsType = {
    product: IProductItem
    className?: string;
}

export const ChooseProductModal: React.FC<PropsType> = ({product}) => {

    const isPizzaForm = Boolean(product.items[0].pizzaType);
    const addCartItem  = useCartStore(state => state.addCartItem);
    const loading = useCartStore(state => state.loading);
    const firstItem = product.items?.[0];
    const router = useRouter();



    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId, // Add pizza item id if pizza
                ingredientsIds: ingredients,
                quantity: 1
            });

                toast.success(product.name + 'has been added to the cart');
                router.back();
        } catch (error) {
            toast.error('There was an error adding the product to the cart');
            console.log(error);
        }
    };

    // Handle the modal close
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            router.back();
        }
    };

    return (
        <Dialog open={Boolean(product)}  onOpenChange={handleOpenChange}>
            <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
                {
                    isPizzaForm ?
                        <
                            ChoosePizzaForm
                            onSubmit={onSubmit}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            items={product.items}
                            loading={loading}
                        />

                        :
                        <ChooseProductForm
                            onSubmit={onSubmit}
                            price={firstItem.price}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            loading={loading}
                        />
                }
            </DialogContent>
        </Dialog>
    );
};
