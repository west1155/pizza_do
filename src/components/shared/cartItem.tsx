'use client';

import React from 'react';
import {X} from 'lucide-react';
import {CartItemProps} from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import {cn} from '../../lib/utils';
import {CartItemInfo} from "./cart-item-details/cart-item-info";

interface PropsType extends CartItemProps {
    id: number;
    className?: string;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
}

export const CartItem: React.FC<PropsType> = ({
                                                  name,
                                                  price,
                                                  imageUrl,
                                                  className,
                                                  onClickCountButton,


                                              }) => {
    return (
        <div className={cn('flex items-center justify-between', className)}>
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetails.Image src={imageUrl}/>
                <CartItemInfo name={name}/>
            </div>

            <CartItemDetails.Price value={price}/>

            <div className="flex items-center gap-5 ml-20">
                <CartItemDetails.CountButton onClick={onClickCountButton} />
                <button onClick={() => {}} >
                    <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20}/>
                </button>
            </div>
        </div>
    );
};
