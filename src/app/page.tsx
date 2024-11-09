import {Container} from "@/components/shared";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/app/topBar";
import {Filters} from "@/components/shared/filters";

export default function Home() {
    return <>
        <Container className={'flex flex-col mt-10 px-12'}>
            <Title text='all pizzas' size={'lg'} className={'font-extrabold'}/>
        </Container>
            <TopBar className={'px-12'}/>

        <Container className={'pb-14 px-12'}>
            <div className={'flex gap-[60px]'}>
                <div className={'w-[250px]'}>
                    <Filters />
                </div>
                <div className={'flex-1'}>
                    <div className={'flex flex-col gap-16'}>
                        List of pizzas:
                    </div>
                </div>
            </div>

        </Container>
    </>
}
