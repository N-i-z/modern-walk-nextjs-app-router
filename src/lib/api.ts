export async function fetchProductById(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}
