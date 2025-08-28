type category = {
  categoryName?: string;
  id?: string;
};
type propsType = {
  categories: category[];
};
export default function CategoryNav(props: propsType) {
  return (
    <div className="bg-[#FFFFFF] p-[24px] rounded-[12px]">
      <h4 className="font-[600] text-[20px] text-[#09090B] mb-[16px]">
        Dishes Category
      </h4>
      <div className="flex gap-[12px] flex-wrap">
        <button
          className="py-[8px] px-[16px] rounded-[9999px] border border-[1px] cursor-pointer"
          style={{ borderColor: "#EF4444" }}
        >
          <span>All Category</span>
        </button>
        {props.categories.map((category) => {
          return (
            <button
              className="py-[8px] px-[16px] rounded-[9999px] border border-[1px] cursor-pointer"
              style={{ borderColor: "#E4E4E7" }}
            >
              <span>{category.categoryName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
