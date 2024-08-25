import { Category } from "../../../../../enums/category";

export interface CategoryTileProps {
  category: Category.MensClothing | Category.WomensClothing;
  url: string;
  className: string;
}
