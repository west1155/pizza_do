import { ChoosePizzaForm } from '@/components/shared/choose-pizza-form';
import { Container } from '@/components/shared/container';

import { notFound } from 'next/navigation';
import { prisma } from '../../../../../prisma/prisma-client';
import React from "react";

export default async function ProductPage( { params: { id } }: { params: { id: string } }  ) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    product: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
        },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                items={product.items}
                ingredients={product.ingredients}
            />
        </Container>
    );
}
