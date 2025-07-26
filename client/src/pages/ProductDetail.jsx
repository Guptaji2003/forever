import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultProducts from "../components/ResultProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedProducts,
  fetchSingleProduct,
} from "../redux/slice/productSlice";
import { addToCart } from "../redux/slice/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { relatedProducts, singleProduct, loading } = useSelector(
    (store) => store.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(fetchRelatedProducts(id));
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading || !singleProduct) return <p className="text-center py-10">Loading...</p>;

  const originalPrice = Math.round(singleProduct.price * 1.3);
  const discountPercent = Math.round(
    ((originalPrice - singleProduct.price) / originalPrice) * 100
  );

  return (
    <div data-aos="fade-up" className="mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="w-full rounded-2xl overflow-hidden">
              <img
                src={singleProduct?.image?.[selectedImage]?.url}
                alt={singleProduct?.image?.[selectedImage]?.alttext || "Product image"}
                className="w-full object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {singleProduct?.image?.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={img.alttext || "Thumbnail"}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200
                    ${selectedImage === idx ? "border-rose-500" : "border-transparent"}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{singleProduct?.name}</h1>

            <div className="flex items-center gap-4">
              <p className="text-2xl text-rose-600 font-semibold">₹{singleProduct?.price}</p>
              <p className="text-lg line-through text-gray-400">₹{originalPrice}</p>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-medium">
                {discountPercent}% OFF
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">{singleProduct?.description}</p>

            {/* Color Selection */}
            {singleProduct?.color?.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-800">Available Colors:</h3>
                <div className="flex gap-2 mt-2">
                  {singleProduct?.color?.map((clr, idx) => (
                    <span
                      key={idx}
                      onClick={() => setColor(clr)}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer shadow-md
                        ${color === clr ? "ring-2 ring-gray-700 border-black scale-110" : "border-gray-300"}`}
                      style={{ backgroundColor: clr }}
                      title={clr}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {singleProduct?.size?.length > 0 && singleProduct?.size[0]!="" && (
              <div>
                <h3 className="font-medium text-gray-800 mt-4">Select Size:</h3>
                <div className="flex gap-3 mt-2">
                  {singleProduct?.size?.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSize(s)}
                      className={`px-3 py-1 rounded border text-sm font-medium
                        ${size === s ? "bg-black text-white" : "border-gray-300"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={decreaseQty}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={increaseQty}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    productId: singleProduct._id,
                    quantity,
                    color,
                    size,
                  })
                );
                setQuantity(1);
              }}
              className="mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-bold rounded-lg hover:scale-105 transform transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Products</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10">
            Discover more items that complement your style.
          </p>
          <ResultProducts array={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
