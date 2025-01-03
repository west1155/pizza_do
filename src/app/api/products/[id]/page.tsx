const ProductPage = async ({ params }: { params: { id: number } }) => {
    const { id } = await params;
    return <p>Product {id}</p>;
}

export default ProductPage;