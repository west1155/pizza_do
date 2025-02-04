'use client';

import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { cn } from '../../lib/utils';
import {apiClient} from "../../services/api-client";

export const SearchBar = () => {
    const [focused, setFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [products, setProducts] = React.useState<Product[]>([]);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        async () => {
            if (searchQuery.trim() !== '') {
                const products = await apiClient.products.search(searchQuery);
                setProducts(products);
            }
        },
        100,
        [searchQuery],
    );

    const onClickItem = () => {
        setProducts([]);
        setSearchQuery('');
        setFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            e.preventDefault();
            // Trigger the search manually
            apiClient.products.search(searchQuery).then(setProducts);
        }
    };

    return (
        <>
            {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
            <div
                ref={ref}
                className={cn('flex rounded-2xl flex-1 justify-between relative h-11', focused && 'z-30')}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

                <input
                    className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {products.length > 0 && searchQuery.trim() !== '' && (
                    <div
                        className={cn(
                            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12',
                        )}>
                        {products.map((product) => (
                            <Link href={`/src/app/(root)/products/${product.id}`} key={product.id}>
                                <div onClick={onClickItem} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
                                    {product.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};