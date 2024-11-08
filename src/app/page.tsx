import {Categories, Container} from "@/components/shared";
import {Title} from "@/components/shared/title";
import {cn} from "@/lib/utils";

export default function Home() {
    return <>
        <Container className={'flex flex-col mt-10 px-12'}>
            <Title text='all pizzas' size={'lg'} className={'font-extrabold'}/>
            <Categories />
        </Container>
    </>
}
