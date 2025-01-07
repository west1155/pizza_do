import React from 'react';
import Link from "next/link";
import {Plus} from "lucide-react";
import {Title} from "./title";
import {Button} from "../ui";


type PropsType = {
    id: number;
    name: string;
    price: number;
    imgURL: string
    className?: string;
}
export const ProductCard: React.FC<PropsType> = ({id, name, price, imgURL, className}) => {
    return (
        <div className={className}>
            <Link href={`/products/${id}`}>
                <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
                    <img className={'w-[250px] h-[250px]'} src={imgURL} alt={name}/>
                </div>
                <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'}/>
                <p className={'text-sm text-gray-400'}>
                    chicken, beef, pork, fish, vegetables
                </p>
                <div className={'flex justify-between items-center mt-4'}>
                    <span className={'text-[20px]'}>
                        from <b>{price} £ </b>
                    </span>
                    <Button variant={'secondary'}>
                        <Plus className={'w-5 h-5 mr-1'}/>
                        Add to cart
                    </Button>
                </div>
            </Link>

        </div>
    );
}
