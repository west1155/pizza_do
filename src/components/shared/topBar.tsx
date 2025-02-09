
import {Category} from "@prisma/client";
import {Categories} from "./categories";
import {Container} from "./container";
import {cn} from "../../lib/utils";
import React from "react";

type PropsType = {
    categories: Category[];
    className?: string;
}
export const TopBar: React.FC<PropsType> = ({className, categories}) => {
    return (
            <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
                <Container className="flex items-center justify-between ">
                    <Categories items={categories} className={'font-light'} />
                </Container>
            </div>
    )
}