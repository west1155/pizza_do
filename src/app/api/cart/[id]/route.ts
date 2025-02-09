import {NextRequest, NextResponse} from "next/server";
import {calcCartItemTotalAmount} from "@/lib/calc-cart-item-total-amount";
import { prisma } from "../../../../../prisma/prisma-client";

async function updateCartTotalAmount(cartToken: string) {
    const userCart = await prisma.cart.findFirst({
        where: {
            tokenId: cartToken
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    const totalAmount = userCart?.items.reduce((acc, item) => {
        return acc + calcCartItemTotalAmount(item);
    }, 0) ?? 0;

    return await prisma.cart.update({
        where: {
            id: userCart?.id,
        },
        data: {
            totalAmount,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { params } = context;
        const cartToken = req.cookies.get('cartToken')?.value;

        if (!cartToken) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(params.id),
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        const data = (await req.json()) as { quantity: number };

        await prisma.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity: data.quantity,
            },
        });

        await updateCartTotalAmount(cartToken);

        const userCart = await prisma.cart.findFirst({
            where: {
                tokenId: cartToken
            },
            include: {
                items: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        productItem: { include: { product: true } },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: '[CART_PATCH] Server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { params } = context;
        const cartToken = req.cookies.get('cartToken')?.value;

        if (!cartToken) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(params.id),
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.delete({ where: { id: cartItem.id } });

        await updateCartTotalAmount(cartToken);

        const userCart = await prisma.cart.findFirst({
            where: {
                tokenId: cartToken
            },
            include: {
                items: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        productItem: { include: { product: true } },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
    }
}