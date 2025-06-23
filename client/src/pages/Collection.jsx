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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    <div className="bg-gray-100 mt-10 pt-10  min-h-screen">
      {/* Toggle Filter Button for Mobile */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">Collections</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? "Close" : "Filters"}
        </button>
      </div>

      <div className="max-w-7xl  mx-auto flex gap-6 px-4 mt-4">
        {/* Sidebar Filter */}
        <div
          className={`w-full md:w-1/4 bg-white rounded-xl shadow-lg p-6  mt-10 transition-transform duration-300 ease-in-out md:static fixed top-0 left-0 h-full overflow-y-auto md:h-auto ${
            isMobileFilterOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="md:hidden -z-1 flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              className="text-red-500 font-bold"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              ✕
            </button>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:ring focus:ring-blue-400"
          />

          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Min Price</label>
            <input
              type="number"
              value={minprice}
              onChange={(e) => setMinprice(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <label className="block text-sm font-semibold mb-1">Max Price</label>
            <input
              type="number"
              value={maxprice}
              onChange={(e) => setMaxprice(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <label className="block text-sm font-semibold mb-1">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
            <option value="-name">Name: Z-A</option>
          </select>

          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Reset Filters
          </button>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4 mt-6 md:mt-0">
          {filteredProducts?.length === 0 ? (
            <div className="text-center text-gray-600 text-lg mt-20">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
