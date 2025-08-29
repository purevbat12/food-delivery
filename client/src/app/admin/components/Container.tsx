"use client";
import { useState, useEffect } from "react";
import { produce, current } from "immer";
import Modal from "./Modal";
import SideNav from "./SideNav";
import FoodMenu from "./FoodMenu";
import { Orders } from "./Orders";
type category = {
  categoryName?: string;
  _id?: string;
};
export default function Contianer() {
  const labels = ["Food Menu", "Orders"];
  const [reRender, setReRender] = useState(0);
  const [activeTab, setActiveTab] = useState(labels[0]);
  const [categories, setCategories] = useState<category[]>([]);
  const [createCategoryModalIsOpen, setCreateCategoryModalIsOpen] =
    useState(false);
  const [updateCategoryModalIsOpen, setUpdateCategoryModalIsOpen] =
    useState(false);
  const [areYouSureModalIsOpen, setAreYouSureModalIsOpen] = useState(false);
  const [categoryToBeDeletedName, setCategoryToBeDeletedName] = useState("");
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [newCategoryNameInput, setNewCategoryNameInput] = useState("");
  const [countsOfItemsWithinCategory, setCountsOfItemsWithinCategory] =
    useState<number[]>([]);
  const [countOfAllItems, setCountOfAllItems] = useState(0);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryChoosen, setCategoryChoosen] = useState("All Categories");
  async function deleteCategory(id: string) {
    //"http://localhost:8000/food-category/delete"
    await fetch(`http://localhost:8000/food-category/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setAreYouSureModalIsOpen(false);
    setUpdateCategoryModalIsOpen(false);
  }
  async function createCategory(name: string) {
    await fetch("http://localhost:8000/food-category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: name,
      }),
    })
      .then((response) => {
        if (!response) {
          throw new Error("HTTP error! Status: " + response);
        }
        setCreateCategoryModalIsOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
    setReRender((r) => r + 1);
  }
  useEffect(() => {
    async function getCategories() {
      await fetch("http://localhost:8000/food/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response) {
            throw new Error("HTTP error! Status: " + response);
          }
          return response.json();
        })
        .then((data) => {
          setCountOfAllItems(data.length);
        })
        .catch((err) => {
          console.error(err);
        });
      await fetch("http://localhost:8000/food-category/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response) {
            throw new Error(`HTTP error! Status: ${response}`);
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data.allCategories);
        })
        .catch((err) => console.error(err));
    }
    getCategories();
  }, [reRender]);
  useEffect(() => {
    async function getCounts() {
      for (let i = 0; i < categories.length; i++) {
        await fetch(
          `http://localhost:8000/food/get-foods-by-category?categoryId=${categories[i]._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response) {
              throw new Error("HTTP error! Status: " + response);
            }
            return response.json();
          })
          .then((data) => {
            setCountsOfItemsWithinCategory((prevCounts) =>
              produce(prevCounts, (draft) => {
                draft[i] = data.foodsByCategory
                  ? data.foodsByCategory.length
                  : 0;
              })
            );
            setCategoryLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    getCounts();
  }, [categories]);
  return (
    <div className="flex">
      <SideNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        labels={labels}
      />
      {activeTab == "Food Menu" ? (
        <FoodMenu
          setCategories={setCategories}
          categories={categories}
          countsOfItemsWithinCategory={countsOfItemsWithinCategory}
          setCountsOfItemsWithinCategory={setCountsOfItemsWithinCategory}
          countOfAllItems={countOfAllItems}
          setCountOfAllItems={setCountOfAllItems}
          loading={categoryLoading}
          setLoading={setCategoryLoading}
          categoryChoosen={categoryChoosen}
          setCategoryChoosen={setCategoryChoosen}
          setCreateCategoryModalIsOpen={setCreateCategoryModalIsOpen}
          setUpdateCategoryModalIsOpen={setUpdateCategoryModalIsOpen}
          categoryToBeDeletedName={categoryToBeDeletedName}
          setCategoryToBeDeletedName={setCategoryToBeDeletedName}
        />
      ) : (
        <Orders />
      )}
      <Modal
        title={"Add new Category"}
        isOpen={createCategoryModalIsOpen}
        setIsOpen={setCreateCategoryModalIsOpen}
        z={2}
      >
        <form className="flex flex-col gap-[8px]">
          <label>Category name</label>
          <input
            onChange={(event) => {
              setCategoryNameInput(event.target.value);
            }}
            placeholder="Type category name..."
            className="rounded-[6px] py-[8px] px-[12px] w-[100%] border border-[#E4E4E7]"
          ></input>
        </form>
        <button
          onClick={() => createCategory(categoryNameInput)}
          className="text-[14px] text-[#FAFAFA] font-[500] bg-[#18181B] py-[8px] px-[16px] rounded-[6px] cursor-pointer"
        >
          Add Category
        </button>
      </Modal>
      <Modal
        title={"Edit Category"}
        isOpen={updateCategoryModalIsOpen}
        setIsOpen={setUpdateCategoryModalIsOpen}
        z={2}
      >
        <form className="flex flex-col gap-[8px]">
          <label>New Category name</label>
          <input
            className="rounded-[6px] py-[8px] px-[12px] w-[100%] border border-[#E4E4E7]"
            placeholder="New Category name..."
            onChange={(event) => {
              setNewCategoryNameInput(event.target.value);
            }}
          ></input>
        </form>
        <div className="flex justify-between w-[80%] mx-auto">
          <button
            className="text-[14px] text-[#FAFAFA] font-[500] bg-[#18181B] py-[8px] px-[16px] rounded-[6px] cursor-pointer"
            onClick={() => {
              setAreYouSureModalIsOpen(true);
            }}
          >
            Delete
          </button>
          <button
            className="text-[14px] text-[#FAFAFA] font-[500] bg-[#18181B] py-[8px] px-[16px] rounded-[6px] cursor-pointer"
            onClick={() => {}}
          >
            Update
          </button>
        </div>
      </Modal>
      <Modal
        title={"Are you sure?"}
        isOpen={areYouSureModalIsOpen}
        setIsOpen={setAreYouSureModalIsOpen}
        z={3}
      >
        <form className="flex flex-col gap-[20px]">
          <label className="text-[16px]">
            This action will delete the category and the foods within for good.
            Press the button down to comfirm or press the x button to cancel.
          </label>
          <button
            onClick={() => deleteCategory(categoryToBeDeletedName)}
            className="text-[14px] text-[#FAFAFA] font-[500] bg-[#18181B] py-[8px] px-[16px] rounded-[6px] cursor-pointer"
          >
            Yes i am sure
          </button>
        </form>
      </Modal>
    </div>
  );
}
