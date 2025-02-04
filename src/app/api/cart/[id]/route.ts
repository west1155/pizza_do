import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";
import {calcCartItemTotalAmount} from "@/lib/calc-cart-item-total-amount";

async function updateCartTotalAmount(userId: number, cartToken: string) {

    const userCart = await prisma.cart.findFirst({
        where: {
            OR: [
                {
                    userId,
                },
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

    const totalAmount = userCart?.items.reduce((acc, item) => {
        return acc + calcCartItemTotalAmount(item);
    }, 0);

    return prisma.cart.update({
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


export async function PATCH(req: NextRequest, {params}: { params: { id: string } }) {

    const {id} = params;
    const data = await (req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;


    if (!token) {
        return NextResponse.json({error: 'Cart token not found'});
    }


    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: Number(id),
        }
    })

    if (!cartItem) {
        return NextResponse.json({error: 'Cart item not found'});
    }

    await prisma.cartItem.update({
        where: {
            id: cartItem.id,
        },
        data: {
            quantity: data.quantity,
        }
    })

    await updateCartTotalAmount(Number(id), token);



    const updatedCartItems = await prisma.cartItem.findMany({
        where: {
            cartId: cartItem.id
        },
        include: {
            productItem: {
                include: {
                    product: true,
                },
            },
            ingredients: true,
        },
    });

    return NextResponse.json(updatedCartItems);
}