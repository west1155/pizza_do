import {prisma} from "../../../../../prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductImage, Title} from "@/components/shared";
import {GroupVariants} from "@/components/shared/group-variants";

const ProductPage = async ({params}: { params: { id: number } }) => {
    const {id} = await params;
    const product = await prisma.product.findFirst({where: {id: Number(id)}});

    if (!product) {
        notFound()
    }
    return <Container className={'flex flex-col my-10'}>
        <div className={'flex flex-1'}>
            <ProductImage size={20} imageUrl={product.imageUrl}/>
            <div className={'w-[490px] bg-[#FCFCFC] p-7'}>
                <Title text={product.name} size="md" className={'font-extrabold mb-1'}/>
                <p className={'text-gray-400'}>Lorem ipsum dolor sit amet.</p>
                <GroupVariants className={'mt-2'}

                    items={[
                    {
                        name: 'Small',
                        value: '1'
                    },
                    {
                        name: 'Medium',
                        value: '2'
                    },
                    {
                        name: 'Big',
                        value: '3'
                    }
                ]} selectedValue={'2'}/>
            </div>
        </div>
    </Container>
}

export default ProductPage;