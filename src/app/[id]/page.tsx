import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductActions from "../ui-core/components/organisms/product-actions/ProductActions";
import { fetchProductById } from "../../lib/api";
import { Heading } from "../ui-core/components";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="max-w-[50vw] truncate">
        <Heading variant="h2">{product.title}</Heading>
      </div>
      <div className="px-32 flex">
        <Image
          src={product.image}
          alt={product.title}
          height={500}
          width={350}
          layout="fixed"
        />
        <span className="px-32 py-10">
          <h4 className="text-priceBlue font-bold text-2xl mb-4">
            {product.price}
          </h4>
          <p className="text-lg">{product.description}</p>
          <ProductActions
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        </span>
      </div>
    </div>
  );
}
