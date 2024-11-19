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