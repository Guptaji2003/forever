import React from "react";
import Item from "./Item";

const ResultProducts = ({ array }) => {
  return (
    <div className="w-full">
      {array && array.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 sm:px-4 md:px-6 lg:px-8">
          {array.map((product) => (
            <Item key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <span>No products found.</span>
        </div>
      )}
    </div>
  );
};

export default ResultProducts;
