import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../redux/slice/productSlice";

const Collection = () => {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.product);

  // State setup for allowed filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [minprice, maxprice] = priceRange
    ? priceRange.split("-").map(Number)
    : ["", ""];

  useEffect(() => {
    dispatch(
      filterProducts({
        category,
        color,
        size,
        minprice,
        maxprice,
        search,
        sort,
      })
    );
  }, [category, color, size, minprice, maxprice, search, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setColor("");
    setSize("");
    setPriceRange("");
    setSort("");
  };

  return (
    <div data-aos="fade-up" className="bg-gray-100 mt-10 pt-10 min-h-screen">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">Collections</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? "Close" : "Filters"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 px-4 mt-4">
        {/* Sidebar Filter */}
        <div
          className={`w-full md:w-1/4 bg-white rounded-xl shadow-xl p-6 mt-10 transition-transform duration-300 ease-in-out md:static fixed top-0 left-0 h-full overflow-y-auto md:h-auto z-50 ${
            isMobileFilterOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Mobile Close */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
            <button
              className="text-red-600 text-xl font-bold"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          {/* Color */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Black">Black</option>
            <option value="Pink">Pink</option>
          </select>

          {/* Size */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          {/* Price Range */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">All Prices</option>
            <option value="0-500">₹0 – ₹500</option>
            <option value="500-1000">₹500 – ₹1000</option>
            <option value="1000-2000">₹1000 – ₹2000</option>
            <option value="2000-5000">₹2000 – ₹5000</option>
            <option value="5000-10000">₹5000 – ₹10000</option>
          </select>

          {/* Sort */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
            <option value="-name">Name: Z-A</option>
          </select>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white py-2 mt-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 mt-6 mb-10 md:mt-0">
          {filteredProducts?.length === 0 ? (
            <div className="text-center text-gray-600 text-lg mt-20">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
