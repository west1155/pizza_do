import {prisma} from "./prisma-client";
import {hashSync} from "bcrypt";
import {ProductItem} from "@prisma/client";

const generateProductItem = (productId: number, size: string, pizzaType: string)
    : Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'> => {
    return {
        productId,
        price: 0, // Default price, should be set appropriately
        size,
        pizzaType,
    };
}


const ingridients = [
    {
        name: 'Bacon',
        price: 1.5,
        imageUrl: './public/images/ingridients/bacon.png',
    },
    {
        name: 'Cheese',
        price: 0.5,
        imageUrl: './public/images/ingridients/mozarella.png',
    },
    {
        name: 'Mushrooms',
        price: 1.0,
        imageUrl: './public/images/ingridients/mushrooms.png',
    },
    {
        name: 'Cholopens',
        price: 1.0,
        imageUrl: './public/images/ingridients/cholopens.png',
    },
]

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'John Doe',
                email: 'test@gg.net',
                password: hashSync('1111', 10),
                role: 'USER',
                verified: new Date(),
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@gg.net',
                password: hashSync('1111', 10),
                role: 'ADMIN',
                verified: new Date(),
            },
        ]

    })

    await prisma.category.createMany({
        data: [
            {
                name: 'Pizza',
            },
            {
                name: 'Burgers',
            },
            {
                name: 'Snacks',
            },
            {
                name: 'Drinks',
            },
        ],
    })

    await prisma.product.createMany({
        data: [{
            name: 'Sandwich with bacon and cheese',
            imageUrl: './public/images/11EED646B7AC9C38BA256320DD31C4D5.avif',
            categoryId: 2
        },
            {
                name: 'Chicken nuggets',
                imageUrl:
                    './public/images/11EE7D61B9521D369D61228456C8F6C9.avif',
                categoryId: 3,
            },
            {
                name: 'Baked potatoes with sauce',
                imageUrl: './public/images/production/11EED646B7AC9C38BA256320DD31C4D5.avif',
                categoryId: 3,
            }]
    })

    await prisma.ingredient.createMany({
        data: ingridients
    })



    const pizzaMargo = await prisma.product.create({
        data: {
            name: 'Margarita',
            imageUrl: './public/images/11EF8D3BC9E84FB7B5CFB7F47C6FB334.avif',
            categoryId: 1,
            ingredients: {
                connect: ingridients.slice(0, 4).map((ingredient, index) => ({id: index + 1}))
            }
        }
    })

    const pizzaCheese = await prisma.product.create({
        data: {
            name: 'Cheesee',
            imageUrl: './public/images/11EF8D3BC9E84FB7B5CFB7F47C6FB334.avif',
            categoryId: 1,
            ingredients: {
                connect: ingridients.slice(0, 4).map((ingredient, index) => ({id: index + 1}))
            }
        }
    })

    const pizzaCholopens = await prisma.product.create({
        data: {
            name: 'Cheesee',
            imageUrl: './public/images/11EF8D3BC9E84FB7B5CFB7F47C6FB334.avif',
            categoryId: 1,
            ingredients: {
                connect: ingridients.slice(0, 4).map((ingredient, index) => ({id: index + 1}))
            }
        }
    })

    await prisma.productItem.createMany({
        data: [
            /*Margarita pizza*/
            generateProductItem(pizzaMargo.id, 'small', 'thin'),
            generateProductItem(pizzaMargo.id, 'medium', 'normal'),
            generateProductItem(pizzaMargo.id, 'large', 'fat'),
            /*Cheese pizza*/
            generateProductItem(pizzaCheese.id, 'small', 'thin'),
            generateProductItem(pizzaCheese.id, 'large', 'thin'),
            generateProductItem(pizzaCheese.id, 'medium', 'normal'),
            generateProductItem(pizzaCheese.id, 'small', 'normal'),
            generateProductItem(pizzaCheese.id, 'large', 'normal'),
            generateProductItem(pizzaCheese.id, 'large', 'fat'),

            /*Cholopens pizza*/
            generateProductItem(pizzaCholopens.id, 'small', 'thin'),
            generateProductItem(pizzaCholopens.id, 'medium', 'normal'),
            generateProductItem(pizzaCholopens.id, 'large', 'fat')
        ]
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down()
        await up()
    } catch (e) {
        console.error(e)
    }
}


main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})