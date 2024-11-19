import {prisma} from "./prisma-client";
import {hashSync} from "bcrypt";

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

    await prisma.product.createMany({
        data: [{
            name: 'Sandwich with bacon and cheese',
            imageUrl: './public/images/11EED646B7AC9C38BA256320DD31C4D5.avif',
            categoryId: 3,
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
        data: [
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
        ],
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
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
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