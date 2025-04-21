import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResultProducts from "../components/ResultProducts";
import UseAddToCart from "../hooks/UseAddToCart";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { products, selectedProduct } = useSelector((store) => store.product);
  const { user } = useSelector((store) => store.auth);
  const { addtocart, whislist } = UseAddToCart();
  const [relatedproducts, setrelatedproducts] = useState([]);
  const isInCart = user?.cart?.some((item) => item._id === selectedProduct._id);
  const isInWhislist = user?.whislist?.some((item) => item._id === selectedProduct._id);
  useEffect(() => {
    const related = products.filter(
      (item) =>
        item.category === selectedProduct.category &&
        item._id !== selectedProduct._id
    );
    setrelatedproducts(related);
  }, [selectedProduct]);

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <img
              src={selectedProduct.image}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              ${selectedProduct.price}
            </p>
            <p className="text-base text-gray-700 mb-6">
              {selectedProduct.description}
            </p>

            <button onClick={()=>whislist(selectedProduct._id)} className={`w-full md:w-auto px-6 py-3 ${isInWhislist?"bg-gray-600 text-white":"bg-green-600 text-white"}  text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300`}>
             {isInWhislist?"Added to wishlist":"Add to wishlist"} 
            </button>
{"   "}
            {isInCart ? (
              <Link to={"/cart"}>
                <button className="w-full md:w-auto px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300">
                  Buy Now
                </button>
              </Link>
            ) : (
              <button
                onClick={() => addtocart(selectedProduct._id)}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Features
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-gray-700">Feature 1: High-quality material</li>
            <li className="text-gray-700">Feature 2: Stylish design</li>
            <li className="text-gray-700">Feature 3: Comfortable fit</li>
          </ul>
        </div>
      </div>

      <hr className="w-300 text-gray-400 m-auto" />
      <h2 className="text-3xl font-bold text-center mt-10 mb-6">
        Related Products
      </h2>
      <p className="text-center mb-12">
        Our new arrivals are built to withstand your activities while keeping
        you looking your best!
      </p>
      <ResultProducts array={relatedproducts} />
    </div>
  );
};

export default ProductDetail;
