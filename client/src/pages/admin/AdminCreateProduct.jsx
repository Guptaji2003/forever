import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { setProducts } from '../../redux/productSlice';
import axios from "axios";
import { createProduct } from "../../redux/slice/productSlice";

const AdminCreateProduct = () => {
  const dispatch = useDispatch();

 const [formData, setFormData] = useState({
  name: "",
  imageUrl: "",
  alttext: "",
  price: "",
  category: "",
  color: "",
  size: "",
  description: "",
});


 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: formData.name,
    image: [{ url: formData.imageUrl, alttext: formData.alttext || "product image" }],
    price: Number(formData.price),
    category: formData.category,
    description: formData.description,
    color: formData.color.split(",").map((c) => c.trim()),
    size: formData.size.split(",").map((s) => s.trim()),
  };

  try {
    dispatch(createProduct(payload));
    toast.success("Product created successfully!");
  } catch (error) {
    toast.error("Failed to create product.");
    console.error("Error:", error);
  }
};


  return (
    <div className="max-w-4xl h-150 mx-auto p-8 mt-12 overflow-y-scroll bg-white rounded-3xl shadow-2xl">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Name */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Inputs (URL + Alt Text) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Alt Text</label>
            <input
              type="text"
              name="alttext"
              value={formData.alttext}
              onChange={handleChange}
              placeholder="e.g., Stylish Kurta"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price & Category */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Colors (comma separated)
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g., red, blue, green"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Sizes (comma separated)
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g., S, M, L, XL"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg resize-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold text-lg hover:bg-blue-800 transition duration-300"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
