import { Container } from "@/components/shared";
import { Title } from "@/components/shared/title";
import { Filters } from "@/components/shared/filters";
import { ProductsListGroup } from "@/components/shared/products-list-group";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { TopBar } from "@/components/shared/topBar";
import { Product } from "@prisma/client";
import { getPizzas, GETSearchParams } from "@/app/lib/get-pizzas";

export default async function Home({
                                       searchParams,
                                   }: {
    // We expect searchParams to match GETSearchParams,
    // but it might be lazy, so we await it later.
    searchParams: GETSearchParams;
}) {
    function FiltersLoading() {
        return (
            <div className="w-[250px] animate-pulse bg-muted rounded-lg h-[600px]" />
        );
    }

    // Await searchParams in case it’s lazy (if it's already plain, this will be a no-op)
    const resolvedSearchParams = await Promise.resolve(searchParams);

    // Since resolvedSearchParams is already a plain object,
    // there's no need to call .entries() on it.
    const categories = await getPizzas(resolvedSearchParams);

    return (
        <>
            <Toaster />
            <Container className="flex flex-col mt-10 px-12">
                <Title text="all pizzas" size="lg" className="font-extrabold" />
            </Container>
            <TopBar
                categories={categories.filter(
                    (category) => category.products.length > 0
                )}
            />
            <Container className="pb-14 px-12">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Suspense fallback={<FiltersLoading />}>
                            <Filters />
                        </Suspense>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category: { id: number; name: string; products: Product[] }) => {
                                    if (category.products.length > 0) {
                                        return (
                                            <ProductsListGroup
                                                key={category.id}
                                                title={category.name}
                                                products={category.products}
                                                categoryId={category.id}
                                            />
                                        );
                                    }
                                    return null;
                                }
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
