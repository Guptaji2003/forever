import React, { useState } from "react";
// import { products } from "../assets/Product";
import Item from "../components/Item";
import { useSelector } from "react-redux";

const Collection = () => {
  const [category, setcategory] = useState("");
  const [price, setprice] = useState(0);
  const [query, setquery] = useState("");
  const [result, setresult] = useState([]);
  const {products}=useSelector(store=>store.product);


  const resetFilter = () => {
setcategory('');
setprice(0);
setresult([]);

0}

  React.useEffect(() => {
    const Products = products.filter(
      (product) =>
        (category ? product.category.toLowerCase() === category : true) &&
        (price ? product.price < price : true) &&
        (query
          ? product.name.toLowerCase().includes(query.toLowerCase())
          : true)
    );
    setresult(Products);
  }, [category, price, query]);

  return (
    <>
      <div>
        <div className="flex w-100 m-auto   items-center space-x-2 p-4 rounded-2xl ">
          <input
            type="text"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="w-full p-2 border  focus:outline-none focus:ring focus:ring-black"
          />
        </div>
        <div class="max-w-screen-xl  mx-auto px-4 py-8">
          <div class="flex ">
            {/* <!-- Sidebar Filters --> */}
            
            <div class="w-full lg:w-1/4 p-4 bg-white shadow-md rounded-md mb-6 lg:mb-0 ">
              <h3 class="text-2xl font-semibold text-gray-800 mb-6">Filters</h3>

              {/* <!-- Category Filter --> */}

              <div className="category-select mb-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={(e) => setcategory(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              {/* <div class="mb-6">
                <h4 class="text-lg font-medium text-gray-700 mb-2">Category</h4>
                <ul class="space-y-2">
                  <li>
                    <input
                      type="checkbox"
                      value="men"
                      onChange={(e) => setcategory(e.target.value)}
                      id="men"
                      class="mr-2"
                    />
                    <label for="men" class="text-gray-600">
                      Men
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      value="women"
                      onChange={(e) => setcategory(e.target.value)}
                      id="women"
                      class="mr-2"
                    />
                    <label for="women" class="text-gray-600">
                      Women
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      value="kids"
                      onChange={(e) => setcategory(e.target.value)}
                      id="kids"
                      class="mr-2"
                    />
                    <label for="kids" class="text-gray-600">
                      Kids
                    </label>
                  </li>
                </ul>
              </div> */}

              {/* <!-- Price Filter --> */}
              <div class="mb-6">
                <h4 class="text-lg font-medium text-gray-700 mb-2">
                  Price Range <span className="font-light">[0 to {price}]</span>
                </h4>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  class="w-full mt-2"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
                <div class="flex justify-between text-gray-600 text-sm">
                  <span>$0</span>
                  <span>$10,000</span>
                </div>
              </div>

              <button onClick={resetFilter}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>

            {/* <!-- Product Grid --> */}
            <div className="overflow-y-scroll h-150 w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10 ">
              {result.map((product) => (
                <Item key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
