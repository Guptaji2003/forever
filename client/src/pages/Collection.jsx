import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../redux/slice/productSlice";

const Collection = () => {
   const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minprice, setMinprice] = useState("");
  const [maxprice, setMaxprice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(filterProducts({ category, minprice, maxprice, search, sort }));
  }, [category, minprice, maxprice, search, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setMinprice("");
    setMaxprice("");
    setSort("");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              value={minprice}
              onChange={(e) => setMinprice(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              value={maxprice}
              onChange={(e) => setMaxprice(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Sort Options */}
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 mb-6 border rounded-md"
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
            <option value="-name">Name: Z-A</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Product List */}
        <div className="lg:w-3/4 overflow-x-scroll h-170">
          {filteredProducts?.length === 0 ? (
            <div className="text-center text-gray-600 text-lg mt-20">
              No products found with the current filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Item key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
