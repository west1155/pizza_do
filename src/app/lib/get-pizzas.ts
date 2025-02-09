import {prisma} from "../../../prisma/prisma-client";

export interface GETSearchParams {
    query?: string
    sortBy?:string
    sizes?: string
    pizzaTypes?: string
    ingredients?: string
    priceFrom?: string
    priceTo?: string
}


const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;


export const getPizzas = async (params: GETSearchParams) => {
    const sizes = params.sizes?.split(',').map(Number)
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
    const ingredientsIds = params.ingredients?.split(',').map(Number)

    const minPrice = params.priceFrom? Number(params.priceFrom) : DEFAULT_MIN_PRICE;
    const maxPrice = params.priceTo? Number(params.priceTo) : DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc',
                }, where: {
                    ingredients : ingredientsIds ? {
                        some: {
                            id: {
                                in: ingredientsIds
                            }
                        },
                    } : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            pizzaType: {
                                in: pizzaTypes,
                            },
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            }
                        }
                    }
                },
                include: {
                    ingredients: true,
                    items: true
                }
            }
        },
    });
    return categories
}