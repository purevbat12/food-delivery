import { categoryType } from "../../types";
type propsType = {
  countOfItems: number;
  category: categoryType;
};
export default function CategoryCard({ countOfItems, category }: propsType) {
  return (
    <div className="rounded-[9999px] border py-[8px] px-[16px]">
      <p className="text-[14px]">
        {category.categoryName}
        <span></span>
      </p>
    </div>
  );
}
