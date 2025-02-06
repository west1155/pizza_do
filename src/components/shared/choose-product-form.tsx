import React from 'react';
import {cn} from "../../lib/utils";
import {Title} from './title';
import {Button} from "../ui";
import toast from "react-hot-toast";
import {router} from "next/client";


type ProsType = {
    className?: string;
    imageUrl: string;
    price: number
    name: string
    onSubmit(): void
    loading?: boolean
    onClose: () => void
}

export const ChooseProductForm = ({
                                      className,
                                      imageUrl,
                                      name,
                                      price,
                                      onSubmit,
                                      loading = false,
                                      onClose,
                                  }: ProsType) => {

    const textDetails = 'item description'

    const handleSubmit = async () => {
        try {
            onSubmit()
            toast.success('The product has been added to the cart');
        } catch (error) {
            console.error(error);
            toast.error('There was an error adding the product to the cart');
        }

        onClose()
    };
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative  transition-all z-10 duration-300 w-[250px] h-[250px]"
                />
            </div>
            <div className="w-[450px] bg-[#f7f6f5] p-7">
                <Title text={name} size={'md'} className="font font-extrabold mb-1"/>
                <p className="text-gray-400">{textDetails}</p>

                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart: {price} £
                </Button>

            </div>
        </div>
    );
}