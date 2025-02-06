'use client';

import React, {useEffect} from 'react';
import { PizzaImage } from './pizza-image';
import { Button } from '../ui/button';
import { Title } from './title';
import { IProductItem } from '../../../@types/product';
import { cn } from '../../lib/utils';
import { GroupVariants } from "./group-variants";
import { pizzaDetailsToText, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "../../app/lib/pizza-details-to-text";
import { Ingredient } from "./ingredient";
import { useSet } from 'react-use';

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: IProductItem['ingredients'];
    items?: IProductItem['items'];
    onClickAdd(productItemId: number, ingredients: number): void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
                                                     name,
                                                     imageUrl,
                                                     className,
                                                     ingredients,
                                                     items
                                                 }) => {
    const [size, setSize] = React.useState<PizzaSize>(30);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));

    const textDetaills: string = pizzaDetailsToText(size, type);

    const availablePizzas = items?.filter((item) => item.pizzaType === String(type)) ?? [];
    const availablePizzaSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some((pizza) => pizza.size === item.value)
    }));

    useEffect(() => {
        const isAvailableSIze = availablePizzaSizes?.find((item) => item.value === String(size) && !item.disabled);
        const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

        if (availableSize && !isAvailableSIze) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [availablePizzaSizes, size, type]);

    const totalIngridientsPrice = ingredients
        .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    const pizzaPrice: number = items?.find((item) => item.pizzaType === String(type)
        && item.size === String(size))?.price ?? 0;

    const totalPrice: number = pizzaPrice + totalIngridientsPrice;

    const onHandleClick = () => {
        console.log({
            size,
            type,
            selectedIngredientsIds: Array.from(selectedIngredientsIds)
        });
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <div className={'flex flex-col gap-5 mt-5'}>
                    <GroupVariants items={availablePizzaSizes} selectedValue={String(size)}
                                   onClick={selectedValue => setSize(Number(selectedValue) as PizzaSize)} />

                    <GroupVariants items={pizzaTypes} selectedValue={String(type)}
                                   onClick={selectedValue => setType(Number(selectedValue) as PizzaType)} />
                </div>

                <div className={'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'}>
                    <div className={'grid grid-cols-3 gap-3'}>
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className={'flex justify-between'}>
                                <Ingredient
                                    imageUrl={ingredient.imageUrl}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    onClick={() => toggleAddIngredient(ingredient.id)}
                                    active={selectedIngredientsIds.has(ingredient.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={onHandleClick}
                >
                    Add to Cart {totalPrice} £
                </Button>
            </div>
        </div>
    );
};