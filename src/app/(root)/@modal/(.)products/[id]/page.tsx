
import {notFound} from "next/navigation";
import {prisma} from "../../../../../../prisma/prisma-client";
import {ChooseProductModal} from "@/components/shared/modals";

const ProductModalPage = async ({params}: { params: { id: number } }) => {
    const {id} = await params;
    const product = await prisma.product.findFirst({where: {id: Number(id)}});

    if (!product) {
        notFound()
    }
    return <ChooseProductModal product={product}/>
}

export default ProductModalPage;