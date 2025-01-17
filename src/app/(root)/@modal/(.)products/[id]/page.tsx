import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../../../prisma/prisma-client';

type PageProps = {
    params: { id: string }
}

export default async function PhotoModal({ params }: PageProps) {
    const numericId = Number(params.id);
    if (isNaN(numericId)) {
        return notFound();
    }

    const product = await prisma.product.findFirst({
        where: { id: numericId },
        include: {
            ingredients: true,
            items: {
                orderBy: { createdAt: 'desc' },
                include: {
                    product: {
                        include: { items: true },
                    },
                },
            },
        },
    });

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />;
}