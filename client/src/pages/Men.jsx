import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResultProducts from "../components/ResultProducts";
import { useSelector } from "react-redux";

const Men = () => {
  const { name } = useParams(); // gets "men", "women", etc.
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { allProducts, loading } = useSelector((store) => store.product);

  useEffect(() => {
    if (allProducts.length > 0 && name) {
      const matched = allProducts.filter(
        (product) => product.category.toLowerCase() === name.toLowerCase()
      );
      setFilteredProducts(matched);
    }
  }, [allProducts, name]);

  return (
    <div className="min-h-screen bg-white mb-10 mt-20">
      <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 capitalize">
          {name} Collection
        </h2>
        <p className="text-center mb-8 text-gray-600">
          Explore our latest styles in the {name} category.
        </p>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <ResultProducts array={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Men;
