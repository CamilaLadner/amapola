import React from "react";
import { getProductById } from "@/helpers/products.helpers";
import ProductDetail from "@/components/ProductDetail";

const DetailProduct= async ({params}: {params: Promise< {productID: string}>;}) => {
    const productID = (await params).productID;
    const product = await getProductById(productID);
    return <ProductDetail {...product} />;
}

export default DetailProduct;
