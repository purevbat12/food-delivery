import Categories from "./categoryComponents/Categories";
import CategoryNav from "./categoryComponents/CategoryNav";
export default function Orders() {
  return (
    <div className="bg-[#F4F4F5] w-[100vh] h-[100vh]">
      <CategoryNav />
      <Categories />
    </div>
  );
}
