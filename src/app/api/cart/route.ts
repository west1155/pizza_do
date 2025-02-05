import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import crypto from 'crypto';
import { CreateCartItemValues } from '@/services/dto/cart';

export async function GET(req: NextRequest) {
    try {
        const cartToken = req.cookies.get('cartToken')?.value;

        if (!cartToken) {
            return NextResponse.json({ items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        tokenId: cartToken || '',
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
        console.error(err);
        return NextResponse.json({ message: '[CART_GET] Server error' }, { status: 500 });
    }
}

async function findOrCreateCart(cartToken: string | undefined) {
    let userCart = await prisma.cart.findFirst({
        where: {
            tokenId: cartToken || '',
        },
    });

    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                tokenId: cartToken,
            },
        });
    }

    return userCart;
}

async function updateCartTotalAmount(cartToken: string) {
    const cart = await prisma.cart.findFirst({
        where: {
            tokenId: cartToken || '',
        },
        include: {
            items: {
                include: {
                    productItem: true,
                    ingredients: true,
                },
            },
        },
    });

    if (!cart) {
        throw new Error('Cart not found');
    }

    const totalAmount = cart.items.reduce((sum, item) => {
        const basePrice = item.productItem.price || 0;
        const ingredientsCost = item.ingredients.reduce(
            (acc, ingredient) => acc + (ingredient.price || 0),
            0
        );
        return sum + (basePrice + ingredientsCost) * item.quantity;
    }, 0);

    const updatedCart = await prisma.cart.update({
        where: {
            tokenId: cartToken || '',
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

    return updatedCart;
}

export async function POST(req: NextRequest) {
    try {
        let cartToken = req.cookies.get('cartToken')?.value;
        if (!cartToken) {
            cartToken = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(cartToken);
        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: { every: { id: { in: data.ingredientsIds } } },
            },
        });

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });

            const updatedUserCart = await updateCartTotalAmount(cartToken);
            return NextResponse.json(updatedUserCart);
        }

        await prisma.cartItem.create({
            data: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                quantity: 1,
                ingredients: {
                    connect: data.ingredientsIds?.map((id) => ({ id })) || [],
                },
            },
        });

        const updatedUserCart = await updateCartTotalAmount(cartToken);
        return NextResponse.json(updatedUserCart);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 });
    }
}