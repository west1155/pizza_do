import {Container} from "@/components/shared";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/app/topBar";
import {Filters} from "@/components/shared/filters";
import ProductsListGroup from "@/components/shared/products-list-group";
import {prisma} from "../../prisma/prisma-client";

export default async function Home() {


    const categories = await prisma.category.findMany(
        {
            include: {
                products: {
                    include: {
                        ingredients: true,
                        items: true
                    }
                }
            }
        }
    )
    return (
        <>
            <Container className={'flex flex-col mt-10 px-12'}>
                <Title text='all pizzas' size={'lg'} className={'font-extrabold'}/>
            </Container>
            <TopBar
                className={'px-12'}
                categories={categories.filter((category) => category.products.length > 0)}
            />

            <Container className={'pb-14 px-12'}>
                <div className={'flex gap-[80px]'}>
                    <div className={'w-[250px]'}>
                        <Filters/>
                    </div>
                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            {categories.map((category, index) =>
                                category.products.length > 0 && (
                                <ProductsListGroup
                                    key={index}
                                    title={category.name}
                                    products={category.products}
                                    categoryId={category.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </Container>
        </>
    );
}