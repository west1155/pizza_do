'use client'
import React from "react";
import {cn} from "../../lib/utils";
import {useActiveId} from "../../store";
import {Category} from "@prisma/client";


type PropsType = {
    items: Category[];
    className?: string;
}

export const Categories: React.FC<PropsType> = ({className, items}) => {
    const categotyActiveId = useActiveId((state) => state.activeId);
    return <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-l-sm', className)}>
        {items.map((item, index) => {
            return <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
                categotyActiveId === index && 'bg-white shadow-md shadow-gray-200 text-primary',
            )} key={index}>
                <button className={'font-light text-xs'}>
                    {item.name}
                </button>
            </a>
        })}
    </div>

}