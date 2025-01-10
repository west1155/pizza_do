import React from 'react';
import {cn} from "../../lib/utils";
import { Title } from './title';
import {Button} from "../ui";


type ProsType = {
    className?: string;
    imageUrl: string;
    name: string
    onClickAdd?: void

}

export const ChooseProductForm = ({
                                    className,
                                    imageUrl,
                                    name,
                                    }: ProsType)=>  {
    const textDetails = 'item describtion'
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

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart - 30£
                </Button>

            </div>
        </div>
    );
}