"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { produce, current } from "immer";
import Modal from "./Modal";
import SideNav from "./SideNav";
import FoodMenu from "./FoodMenu";
import { Orders } from "./Orders";
import { categoryType, foodType } from "../types";
export default function Contianer() {
  const labels = ["Food Menu", "Orders"];
  const [reRender, setReRender] = useState(0);
  const [activeTab, setActiveTab] = useState(labels[0]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [createCategoryModalIsOpen, setCreateCategoryModalIsOpen] =
    useState(false);
  const [updateCategoryModalIsOpen, setUpdateCategoryModalIsOpen] =
    useState(false);
  const [areYouSureModalIsOpen, setAreYouSureModalIsOpen] = useState(false);
  const [createFoodModalIsOpen, setCreateFoodModalIsOpen] = useState(false);
  const [categoryToBeEditedId, setCategoryToBeEditedId] = useState("");
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [categoryNameInputError, setCategoryNameInputError] = useState("");
  const [newCategoryNameInput, setNewCategoryNameInput] = useState("");
  const [newCategoryNameInputError, setNewCategoryNameInputError] =
    useState("");
  const [foodNameInput, setFoodNameInput] = useState("");
  const [foodNameInputError, setFoodNameInputError] = useState("");
  const [foodPriceInput, setFoodPriceInput] = useState("");
  const [foodPriceInputError, setFoodPriceInputError] = useState("");
  const [foodIngredientsInput, setFoodIngredientsInput] = useState("");
  const [foodIngredientsInputError, setFoodIngredientsInputError] =
    useState("");
  const [countsOfItemsWithinCategory, setCountsOfItemsWithinCategory] =
    useState<Record<string, number>>({});
  const [countOfAllItems, setCountOfAllItems] = useState(0);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryChoosen, setCategoryChoosen] = useState("All Categories");
  const [foodsOfCategory, setFoodsOfCategory] = useState<foodType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState("");
  async function createFood(
    foodName: string,
    foodPrice: number,
    foodIngredients: string,
    foodImage: string
  ) {}
  async function updateCategory(id: string | null | undefined, name: string) {
    if (!id) {
      return;
    }
    await fetch(`http://localhost:8000/food-category/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        updates: {
          categoryName: name,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    setUpdateCategoryModalIsOpen(false);
    setReRender((r) => r + 1);
  }
  async function deleteCategory(id: string) {
    //"http://localhost:8000/food-category/delete"
    console.log(`http://localhost:8000/food-category/delete/${id}`);
    const res = await fetch(
      `http://localhost:8000/food-category/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res);
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
                draft[categories[i].categoryName as string] =
                  data.foodsByCategory ? data.foodsByCategory.length : 0;
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
  useEffect(() => {
    console.log(categoryToBeEditedId);
  }, [categoryToBeEditedId]);
  useEffect(() => {
    async function getFoods() {
      let foundCategoryId: string | undefined = "";
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].categoryName == categoryChoosen) {
          foundCategoryId = categories[i]._id;
          break;
        }
      }
      if (foundCategoryId != "") {
        await fetch(
          `http://localhost:8000/food/get-foods-by-category/${foundCategoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error! Status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            setFoodsOfCategory(data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (categoryChoosen == "All Categories") {
        await fetch(
          `http://localhost:8000/food/get-all-foods-by-all-categories-object`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error! Status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            setFoodsOfCategory(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    getFoods();
  }, [categoryChoosen]);
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }
  useEffect(() => {
    if (!updateCategoryModalIsOpen) {
      setNewCategoryNameInputError("");
    }
  }, [updateCategoryModalIsOpen]);
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
          categoryToBeEditedId={categoryToBeEditedId}
          setCategoryToBeEditedId={setCategoryToBeEditedId}
          foodsOfCategory={foodsOfCategory}
          createFoodModalIsOpen={createFoodModalIsOpen}
          setCreateFoodModalIsOpen={setCreateFoodModalIsOpen}
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
          <p
            className="text-[#FF0000] text-[10px]"
            style={{
              display: categoryNameInputError == "" ? "none" : "block",
            }}
          >
            {categoryNameInputError}
          </p>
        </form>
        <button
          onClick={() => {
            if (categoryNameInput == "") {
              setCategoryNameInputError("Empty input!");
            } else {
              let alreadyExists = false;
              for (let i = 0; i < categories.length; i++) {
                if (categories[i].categoryName == categoryNameInput) {
                  alreadyExists = true;
                  break;
                }
              }
              if (alreadyExists) {
                setCategoryNameInputError(
                  "This category name already exists in categories!"
                );
              } else {
                createCategory(categoryNameInput);
              }
            }
          }}
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
            value={newCategoryNameInput}
            onChange={(event) => {
              setNewCategoryNameInput(event.target.value);
            }}
          ></input>
          <p
            className="text-[#FF0000] text-[10px]"
            style={{
              display: newCategoryNameInputError == "" ? "none" : "block",
            }}
          >
            {newCategoryNameInputError}
          </p>
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
            onClick={() => {
              if (newCategoryNameInput == "") {
                setNewCategoryNameInputError("Empty input!");
              } else {
                let alreadyExists = false;
                for (let i = 0; i < categories.length; i++) {
                  if (categories[i].categoryName == newCategoryNameInput) {
                    alreadyExists = true;
                  }
                }
                if (alreadyExists) {
                  setNewCategoryNameInputError(
                    "This category name already exists in the categories!"
                  );
                } else {
                  let _id;
                  for (let i = 0; i < categories.length; i++) {
                    if (categories[i]._id == categoryToBeEditedId) {
                      _id = categories[i]._id;
                      break;
                    }
                  }
                  setNewCategoryNameInput("");
                  updateCategory(_id, newCategoryNameInput);
                }
              }
            }}
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
            onClick={() => {
              console.log(categoryToBeEditedId);
              deleteCategory(categoryToBeEditedId);
            }}
            className="text-[14px] text-[#FAFAFA] font-[500] bg-[#18181B] py-[8px] px-[16px] rounded-[6px] cursor-pointer"
          >
            Yes i am sure
          </button>
        </form>
      </Modal>
      <Modal
        title={"Add new Dish to Appetizers"}
        isOpen={createFoodModalIsOpen}
        setIsOpen={setCreateFoodModalIsOpen}
        z={2}
      >
        <form className="flex flex-col gap-[24px]">
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-[500]">Food name</label>
              <input
                value={foodNameInput}
                onChange={(event) => {
                  setFoodNameInput(event.target.value);
                }}
                type="text"
                className="rounded-[6px] py-[8px] px-[12px] border border-[#E4E4E7] w-[194px]"
                placeholder="Type food name..."
              ></input>
              <p
                className="text-[#FF0000] text-[10px]"
                style={{ display: foodNameInputError == "" ? "none" : "block" }}
              >
                {foodNameInputError}
              </p>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-[500]">Food price</label>
              <input
                value={foodPriceInput}
                onChange={(event) => {
                  setFoodPriceInput(event.target.value);
                }}
                type="number"
                className="rounded-[6px] py-[8px] px-[12px] border border-[#E4E4E7] w-[194px]"
                placeholder="Enter price..."
              ></input>
              <p
                className="text-[#FF0000] text-[10px]"
                style={{
                  display: foodPriceInputError == "" ? "none" : "block",
                }}
              >
                {foodPriceInputError}
              </p>
            </div>
          </div>
          <label className="text-[14px] font-[500]">Ingredients</label>
          <input
            value={foodIngredientsInput}
            onChange={(event) => {
              setFoodIngredientsInput(event.target.value);
            }}
            type="text"
            className="rounded-[6px] py-[8px] px-[12px] h-[90px] border border-[#E4E4E7] text-top"
            placeholder="List ingredients..."
          ></input>
          <p
            className="text-[#FF0000] text-[10px]"
            style={{
              display: foodIngredientsInputError == "" ? "none" : "block",
            }}
          >
            {foodIngredientsInputError}
          </p>
          <label className="text-[14px] font-[500]">Food Image</label>
          <div
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            className="border-2 border-dashed border-blue-400 rounded-[6px] p-6 text-center h-[138px] bg-[#F4F7FE] flex justify-center items-center cursor-pointer relative"
          >
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              type="button"
              className="bg-[#FFFFFF] rounded-[100%] w-[36px] h-[36px] absolute z-[2] bottom-[65%] left-[90%] cursor-pointer text-center"
              style={{ display: preview ? "block" : "none" }}
            >
              X
            </button>
            <input
              onChange={handleFileChange}
              id="fileInput"
              className="hidden"
              type="file"
            ></input>
            <label htmlFor="fileInput" className="cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-34 shadow-md rounded-[6px] mx-auto"
                ></img>
              ) : (
                <>
                  <p className="text-gray-600">
                    Choose a file or drag & drop it here
                  </p>
                </>
              )}
            </label>
          </div>
          <p
            className="text-[#FF0000] text-[10px]"
            style={{ display: previewError == "" ? "none" : "block" }}
          >
            {previewError}
          </p>
        </form>
        <div className="flex justify-end">
          <button
            onClick={() => {
              let validInputs: Record<
                  string,
                  {
                    value: string;
                    isValid: boolean;
                    setErr: Dispatch<SetStateAction<string>>;
                  }
                > = {
                  foodName: {
                    value: foodNameInput,
                    isValid: true,
                    setErr: setFoodNameInputError,
                  },
                  foodPrice: {
                    value: foodPriceInput,
                    isValid: true,
                    setErr: setFoodPriceInputError,
                  },
                  foodIngredients: {
                    value: foodIngredientsInput,
                    isValid: true,
                    setErr: setFoodIngredientsInputError,
                  },
                  foodImage: {
                    value: preview as string,
                    isValid: true,
                    setErr: setPreviewError,
                  },
                },
                overall = true;
              for (let i = 0; i < Object.keys(validInputs).length; i++) {
                if (
                  validInputs[Object.keys(validInputs)[i]].value == "" ||
                  validInputs[Object.keys(validInputs)[i]].value == null ||
                  validInputs[Object.keys(validInputs)[i]].value == "null"
                ) {
                  validInputs[Object.keys(validInputs)[i]].isValid = false;
                  validInputs[Object.keys(validInputs)[i]].setErr(
                    "Empty input!"
                  );
                  overall = false;
                }
              }
              if (overall) {
                createFood(
                  foodNameInput,
                  Number(foodPriceInput),
                  foodIngredientsInput,
                  preview as string
                );
              }
            }}
            className="text-[#FAFAFA] bg-[#18181B] rounded-[6px] py-[8px] px-[16px] cursor-pointer"
          >
            Add Dish
          </button>
        </div>
      </Modal>
    </div>
  );
}
