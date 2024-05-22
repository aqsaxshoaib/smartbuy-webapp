"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Filters: React.FC = () => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [pages, setPages] = useState<string>('');

  const router = useRouter();

  function handleButtonClick() {
    const queryParams = new URLSearchParams();

    if (min) queryParams.set("min_price", min);
    if (max) queryParams.set("max_price", max);

    const path = `${window.location.pathname}?${queryParams.toString()}`;
    router.push(path);
  }

 function handleClick(checkbox: HTMLInputElement) {
  const queryParams = new URLSearchParams(window.location.search);

  const checkboxes = document.getElementsByName(checkbox.name) as NodeListOf<HTMLInputElement>;

  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });

  if (checkbox.checked === false) {
    // Delete the filter from query
    queryParams.delete(checkbox.name);
  } else {
    // Set filter in the query
    if (queryParams.has(checkbox.name)) {
      queryParams.set(checkbox.name, checkbox.value);
    } else {
      queryParams.append(checkbox.name, checkbox.value);
    }
  }

  // Filter products based on the selected category
  const categoryFilters = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked && checkbox.name === "category")
    .map((checkbox) => checkbox.value);

  if (categoryFilters.length > 0) {
    queryParams.set("category", categoryFilters.join(","));
  } else {
    queryParams.delete("category");
  }

  const path = `${window.location.pathname}?${queryParams.toString()}`;
  router.push(path);
}

  function checkHandler(checkBoxType: string, checkBoxValue: string) {
    const queryParams = new URLSearchParams(window.location.search);

    const value = queryParams.get(checkBoxType);
    if (checkBoxValue === value) return true;
    return false;
  }

  return (
    <aside className="px-4">
      
      <div className="grid md:grid-cols-3 gap-x-2 bg-white p-4 rounded-md shadow-md justify-center items-center">
      <h3 className="font-semibold mb-3 col-span-3 ">Price ($)</h3>
      
        <div className="mb-4">
          
          <input
            name="min"
            className="appearance-none border border-gray-200 bg-white rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            name="max"
            className="appearance-none border border-gray-200 bg-white rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            onClick={handleButtonClick}
          >
            Go
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Category</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Men"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Men")}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  handleClick(target);
                }}
              />
              <span className="ml-2 text-gray-500"> Men </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Women"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Women")}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  handleClick(target);
                }}
              />
              <span className="ml-2 text-gray-500"> Women </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Electronics"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Electronics")}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  handleClick(target);
                }}
              />
              <span className="ml-2 text-gray-500"> Electronics </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Beauty"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Beauty")}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  handleClick(target);
                }}
              />
              <span className="ml-2 text-gray-500"> Beauty </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Clothes"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Clothes")}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  handleClick(target);
                }}
              />
              <span className="ml-2 text-gray-500"> Clothes </span>
            </label>
          </li>
        </ul>
      </div>

      <div className="px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Ratings</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  defaultChecked={checkHandler("ratings", `${rating}`)}
                  onClick={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleClick(target);
                  }}
                />
                <span className="ml-2 text-yellow-500 text-2xl">{[...Array(rating)].map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
          </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
