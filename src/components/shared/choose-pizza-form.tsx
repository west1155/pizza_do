'use client';

import React from 'react';
import { PizzaImage } from './pizza-image';
import { Button } from '../ui/button';
import { Title } from './title';
import { IProductItem } from '../../../@types/product';
import { cn } from '../../lib/utils';
import {GroupVariants} from "./group-variants";
import {PizzaSize, pizzaSizes} from "../../app/lib/pizza-details-to-text";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: IProductItem['ingredients'];
    items?: IProductItem['items'];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
                                                     name,
                                                     imageUrl,
                                                     className,
                                                 }) => {


    const [size, setSize] = React.useState<PizzaSize>(30);

    const textDetaills = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    const totalPrice = '30'



    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <GroupVariants items={pizzaSizes} selectedValue={String(size)} onClick={selectedValue => setSize(Number(selectedValue) as PizzaSize)} />

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to Cart  {totalPrice} £
                </Button>
            </div>
        </div>
    );
};
