import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '../../../../prisma/prisma-client';
import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount';


export async function GET(req: NextRequest) {
    try {

        const cartToken = req.cookies.get('cartToken')?.value;


        if (!cartToken) {
            return NextResponse.json({items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        tokenId: cartToken,
                    },
                ],
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

        return NextResponse.json(userCart);
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: '[CART_GET] Server error'}, {status: 500});
    }
}

async function getCartTotalAmount(cartId: number): Promise<number> {
    const userCartAfterUpdate = await prisma.cart.findFirst({
        where: {
            id: cartId,
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
        orderBy: {
            createdAt: 'desc',
        },
    });

    const totalAmount = userCartAfterUpdate?.items.reduce(
        (acc, item) => acc + calcCartItemTotalAmount(item),
        0,
    );

    return totalAmount ?? 0;
}