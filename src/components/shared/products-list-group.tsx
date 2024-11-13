'use client';

import React, {useEffect} from 'react';
import {Title} from "./title";
import {cn} from "../../lib/utils";
import {ProductCard} from "./product-card";
import { useIntersection } from 'react-use';
import {useActiveId} from "../../store";



type PropsType = {
    className?: string;
    title: string;
    products: any[];
    listClassName?: string;
    categoryId: number;
}




const ProductsListGroup: React.FC<PropsType> = ({className, title, products, listClassName, categoryId}) => {
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });
    const setActiveId = useActiveId((state) => state.setActiveId);

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
        }
    }, [intersection?.isIntersecting]);

    return (
        <div className={className} ref={intersectionRef}>
            <Title text={title} className={className} />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products
                    .filter((product) => product.items.length > 0)
                    .map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imgURL={product.ImageURL}
                    />))}
            </div>

        </div>
    );
};

ProductsListGroup.propTypes = {

};

export default ProductsListGroup;