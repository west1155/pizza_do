import React from 'react';
import {Title} from "./title";
import {cn} from "../../lib/utils";
import {ProductCard} from "./product-card";



type PropsType = {
    className?: string;
    title: string;
    products: any[];
    listClassName?: string;
    categoryId: number;
}




const ProductsListGroup: React.FC<PropsType> = ({className, title, products, listClassName, categoryId}) => {
    return (
        <div className={className}>
            <Title text={title} size={'lg'} className={'font-extrabold mb-5'}/>
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