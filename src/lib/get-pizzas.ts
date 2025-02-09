import { prisma } from "../../prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
    limit?: string;
    page?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

const DEFAULT_LIMIT = 12;
const DEFAULT_PAGE = 1;

export const findPizzas = async (params: GetSearchParams) => {
    const ingredientsIdArr = params.ingredients?.split(',').map(Number);
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
    const sizes = params.sizes?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const limit = Number(params.limit || DEFAULT_LIMIT);
    const page = Number(params.page || DEFAULT_PAGE);

    const [products, totalCount] = await Promise.all([
        prisma.category.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                products: {
                    orderBy: {
                        id: 'desc',
                    },
                    where: {
                        ingredients: ingredientsIdArr
                            ? {
                                some: {
                                    id: {
                                        in: ingredientsIdArr,
                                    },
                                },
                            }
                            : undefined,
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
                                },
                            },
                        },
                    },
                    include: {
                        items: {
                            where: {
                                price: {
                                    gte: minPrice,
                                    lte: maxPrice,
                                },
                            },
                            orderBy: {
                                price: 'asc',
                            },
                        },
                    },
                },
            },
        }),
        prisma.category.count({
            where: {
                products: {
                    some: {
                        ingredients: ingredientsIdArr
                            ? {
                                some: {
                                    id: {
                                        in: ingredientsIdArr,
                                    },
                                },
                            }
                            : undefined,
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
                                },
                            },
                        },
                    },
                },
            },
        }),
    ]);

    const result = {
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
    };

    return result;
};