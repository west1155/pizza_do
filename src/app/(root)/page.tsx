import { Container } from "@/components/shared";
import { Title } from "@/components/shared/title";
import { Filters } from "@/components/shared/filters";
import { ProductsListGroup } from "@/components/shared/products-list-group";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { findPizzas, GetSearchParams } from "@/lib/get-pizzas";
import {TopBar} from "@/components/shared/topBar";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const awaitedSearchParams = await searchParams;
    const { products: categoryProducts } = await findPizzas(awaitedSearchParams);

    function FiltersLoading() {
        return <div className="w-[250px] animate-pulse bg-muted rounded-lg h-[600px]" />;
    }

    return (
        <>
            <Toaster />
            <Container className={'flex flex-col mt-10 px-12'}>
                <Title text='all pizzas' size={'lg'} className={'font-extrabold'} />
            </Container>
            <TopBar categories={categoryProducts.filter((c: { products: any[] }) => c.products.length > 0)} />

            <Container className={'pb-14 px-12'}>
                <div className={'flex gap-[80px]'}>
                    <div className={'w-[250px]'}>
                        <Suspense fallback={<FiltersLoading />}>
                            <Filters />
                        </Suspense>
                    </div>
                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            {categoryProducts.map(
                                (category: { id: number; name: string; products: any[] }) =>
                                    category.products.length > 0 && (
                                        <ProductsListGroup
                                            key={category.id}
                                            title={category.name}
                                            products={category.products}
                                            categoryId={category.id}
                                        />
                                    ),
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}