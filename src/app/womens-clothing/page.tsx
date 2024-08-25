import React from "react";
import ProductCard from "../ui-core/components/molecules/ProductCard/ProductCard.component";
import Heading from "../ui-core/components/atoms/Typography/Heading.component";
import { Product } from "../../models/Product";

interface ProductsProps {
  products: Product[];
  descriptionBackgroundColor: string;
}

export default async function WomensClothing() {
  const url = "https://fakestoreapi.com/products/category/women's clothing";
  const res = await fetch(url);
  const products: Product[] = await res.json();

  return (
    <div className="content">
      <div className="heading">
        <Heading variant="h2">Women's Clothing</Heading>
      </div>
      <ProductList products={products} descriptionBackgroundColor="#FF5E84" />
    </div>
  );
}

const ProductList: React.FC<ProductsProps> = ({
  products,
  descriptionBackgroundColor,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          description={product.description}
          descriptionBackgroundColor={descriptionBackgroundColor}
          category={product.category}
        />
      ))}
    </div>
  );
};
