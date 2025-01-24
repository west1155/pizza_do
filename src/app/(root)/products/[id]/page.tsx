import { notFound } from "next/navigation"
import { prisma } from "../../../../../prisma/prisma-client"
import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal"

export default async function PhotoModal({
                                             params,
                                         }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const numericId = Number(id)
    if (isNaN(numericId)) {
        return notFound()
    }

    const product = await prisma.product.findFirst({
        where: { id: numericId },
        include: {
            ingredients: true,
            items: {
                orderBy: { createdAt: "desc" },
                include: {
                    product: {
                        include: { items: true },
                    },
                },
            },
        },
    })

    if (!product) {
        return notFound()
    }

    return <ChooseProductModal product={product} />
}

