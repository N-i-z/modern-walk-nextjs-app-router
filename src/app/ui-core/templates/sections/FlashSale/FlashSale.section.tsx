import React from "react";
import ProductCard from "../../../components/molecules/ProductCard/ProductCard.component.tsx";
import { Product } from "../../../../../models/Product.tsx";
import { Category } from "../../../../../enums/category.ts";

export default async function FlashSale() {
  const mensUrl = "https://fakestoreapi.com/products/category/men's clothing";
  const womensUrl =
    "https://fakestoreapi.com/products/category/women's clothing";

  // Fetch data from both APIs concurrently
  const [mensRes, womensRes] = await Promise.all([
    fetch(mensUrl),
    fetch(womensUrl),
  ]);

  // Parse JSON response
  const mensData: Product[] = await mensRes.json();
  const womensData: Product[] = await womensRes.json();

  // Slice and categorize the products
  const MensClothing: Product[] = mensData.slice(0, 2).map((product) => ({
    ...product,
    category: Category.MensClothing,
  }));

  const WomensClothing: Product[] = womensData.slice(0, 2).map((product) => ({
    ...product,
    category: Category.WomensClothing,
  }));

  // Alternate between men's and women's clothing
  const alternateProducts: Product[] = [];
  const maxLength = Math.max(MensClothing.length, WomensClothing.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < MensClothing.length) {
      alternateProducts.push(MensClothing[i]);
    }
    if (i < WomensClothing.length) {
      alternateProducts.push(WomensClothing[i]);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1vw] ml-[0.75vw] -mt-[7px]">
        {alternateProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
            category={product.category}
            descriptionBackgroundColor={
              product.category === Category.MensClothing ? "#2BD9AF" : "#FF5E84"
            }
          />
        ))}
      </div>
    </div>
  );
}
