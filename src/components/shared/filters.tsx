'use client';

import React from 'react';
import qs from 'qs';

import { Title } from './title';
import { RangeSlider } from '../ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMap, useSet } from 'react-use';
import {debounce} from "next/dist/server/utils";
import { Ingredient } from '@prisma/client';
import {CheckboxFilterGroup} from "./checkbox-filter-group";
import { Input } from '../ui';
import {apiClient} from "../../services/api-client";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [filters, { set }] = useMap(Object.fromEntries(searchParams.entries()));
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [selectedIngredientsIds, { toggle }] = useSet(new Set<string>());
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>());
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>());

    React.useEffect(() => {
        async function fetchIngredients() {
            const data = await apiClient.ingredients.getAll();
            setIngredients(data);
        }

        fetchIngredients();
    }, []);

    const updateQueryParams = React.useMemo(
        () =>
            debounce((params) => {
                router.push(
                    `?${qs.stringify(params, {
                        arrayFormat: 'comma',
                    })}`,
                    { scroll: false },
                );
            }, 300),
        [],
    );

    React.useEffect(() => {
        updateQueryParams({
            ...filters,
            ingredients: Array.from(selectedIngredientsIds),
            sizes: Array.from(sizes),
            pizzaTypes: Array.from(pizzaTypes),
        });
    }, [filters, selectedIngredientsIds, pizzaTypes, sizes]);

    const defaultIngredients = ingredients
        ?.slice(0, 6)
        .map((o) => ({ text: o.name, value: o.id.toString() }));

    return (
        <div className={className}>
            <Title
                text="Filters"
                size="sm"
                className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
            />

            <CheckboxFilterGroup
                name="pizzaTypes"
                className="mb-5"
                title="Pizza types"
                onClickCheckbox={togglePizzaTypes}
                items={[
                    { text: 'Slim', value: '1' },
                    { text: 'Traditional', value: '2' },
                ]}
            />

            <CheckboxFilterGroup
                name="sizes"
                className="mb-5"
                title="Sizes"
                onClickCheckbox={toggleSizes}
                items={[
                    { text: '20 cm', value: '20' },
                    { text: '30 cm', value: '30' },
                    { text: '40 cm', value: '40' },
                ]}
            />

            <div className="mt-10 pb-7">
                <p className="font-bold mb-3">Price from to:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={150}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('priceFrom', e.target.value)}
                        value={String(filters.priceFrom || 0)}
                    />
                    <Input
                        type="number"
                        min={1}
                        max={150}
                        placeholder="150"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('priceTo', e.target.value)}
                        value={String(filters.priceTo || 150)}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={150}
                    step={1}
                    value={[Number(filters.priceFrom) || 0, Number(filters.priceTo) || 1000]}
                    onValueChange={([priceFrom, priceTo]: [number, number]) => {
                        set('priceFrom', String(priceFrom || 0));
                        set('priceTo', String(priceTo || 0));
                    }}
                />
            </div>

            <CheckboxFilterGroup
                name="ingredients"
                loading={ingredients.length === 0}
                className="mt-5"
                title="Ingredients"
                limit={6}
                onClickCheckbox={toggle}
                defaultItems={defaultIngredients}
                items={ingredients?.map((o) => ({ text: o.name, value: o.id.toString() })) || []}
            />
        </div>
    );
};
