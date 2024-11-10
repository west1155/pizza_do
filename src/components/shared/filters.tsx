'use client';

import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Input, RangeSlider} from "@/components/ui";
import {useSearchParams} from "next/navigation";
import { useMap} from 'react-use';

type PropType = {
    className?: string
}

export const Filters: React.FC<PropType> = ({className}) => {
    const searchParams = useSearchParams()
    const [filters, { set }] = useMap(Object.fromEntries(searchParams.entries()));
    return (
        <div className={className}>
            <Title text={'filtration'} size={'sm'} className={'mb-5 font-bold'}/>
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
                    onValueChange={([priceFrom, priceTo]) => {
                        set('priceFrom', String(priceFrom || 0));
                        set('priceTo', String(priceTo || 0));
                    }}
                />
            </div>
        </div>
    );
}