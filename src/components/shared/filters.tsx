'use client';

import {useSearchParams} from "next/navigation";
import { useMap} from 'react-use';
import {CheckboxFilterGroup} from "./checkbox-filter-group";
import {FilterCheckbox} from "./filter-checkbox";
import {Title} from "./title";
import {Input, RangeSlider} from "../ui";
import React from "react";

type PropType = {
    className?: string
}



export const Filters: React.FC<PropType> = ({className}) => {
    const searchParams = useSearchParams()
    const [filters, { set }] = useMap(Object.fromEntries(searchParams.entries()));
    const items = [
        {text: 'Mushrooms', value: 'mushrooms'},
        {text: 'Tomato', value: 'tomato'},
        {text: 'Cheese', value: 'cheese'},
        {text: 'Olives', value: 'olives'},
        {text: 'Bacon', value: 'bacon'},
        {text: 'Pepperoni', value: 'pepperoni'},
        {text: 'Paprika', value: 'paprika'},
        {text: 'Corn', value: 'corn'},
        {text: 'Onion', value: 'onion'},
        {text: 'Chicken', value: 'chicken'},
        {text: 'Beef', value: 'beef'},
        {text: 'Pork', value: 'pork'},
        {text: 'Salami', value: 'salami'},
        {text: 'Shrimp', value: 'shrimp'},
        {text: 'Mussels', value: 'mussels'},
        {text: 'Tuna', value: 'tuna'},
        {text: 'Crab', value: 'crab'},

    ];
    return (
        <div className={className}>
            <Title text={'Filters'} size={'sm'} className={'mb-5 font-bold'}/>
            <div className={'flex flex-col gap-4'}>
                <FilterCheckbox text={'can pick up'} value={'1'}/>
                <FilterCheckbox text={'new pizzas'} value={'2'}/>
            </div>
            <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7 '}>
                <p className={'font-bold mb-3'}>Price from to:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input type="number" placeholder="0" min={0} max={30000}/>
                    <Input type="number" min={100} max={30000} placeholder="30000"/>
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[Number(filters.priceFrom) || 0, Number(filters.priceTo) || 1000]}
                    onValueChange={([priceFrom, priceTo]: [number, number]) => {
                        set('priceFrom', String(priceFrom || 0));
                        set('priceTo', String(priceTo || 0));
                    }}
                />
            </div>

            <CheckboxFilterGroup
                className={'mt-5'}
                title={'Ingridients'}
                items={items}
                defaultItems={items}
            />
        </div>
    );
}