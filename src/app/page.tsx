import {Container} from "@/components/shared";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/app/topBar";
import {Filters} from "@/components/shared/filters";
import ProductsListGroup from "@/components/shared/products-list-group";

export default function Home() {
    return <>
        <Container className={'flex flex-col mt-10 px-12'}>
            <Title text='all pizzas' size={'lg'} className={'font-extrabold'}/>
        </Container>
        <TopBar className={'px-12'}/>

        <Container className={'pb-14 px-12'}>
            <div className={'flex gap-[80px]'}>
                <div className={'w-[250px]'}>
                    <Filters/>
                </div>
                <div className={'flex-1'}>
                    <div className={'flex flex-col gap-16'}>
                        <ProductsListGroup title={'Pizzas'} products={
                            [
                                {
                                    id: 1,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 2,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 3,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 4,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 5,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 6,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                            ]
                        }
                                           categoryId={1}/>
                        <ProductsListGroup title={'Pizzas222'} products={
                            [
                                {
                                    id: 1,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 2,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 3,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 4,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 5,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                                {
                                    id: 6,
                                    name: 'pizza num',
                                    items: [{price: 5}],
                                    ImageURL: '/11EE7D612FC7B7FCA5BE822752BEE1E5.avif'
                                },
                            ]
                        }
                                           categoryId={2}/>
                    </div>
                </div>
            </div>

        </Container>
    </>
}
