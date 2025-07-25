import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createProduct } from "../../redux/slice/productSlice";

const AdminCreateProduct = () => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
      image: [
        {
          url: formData.imageUrl,
          alttext: formData.alttext || "product image",
        },
      ],
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      color: formData.color.split(",").map((c) => c.trim()),
      size: formData.size.split(",").map((s) => s.trim()),
    };

    try {
      dispatch(createProduct(payload));
      toast.success("Product created successfully!");
      setFormData({
        name: "",
        imageUrl: "",
        alttext: "",
        price: "",
        category: "",
        color: "",
        size: "",
        description: "",
      });
    } catch (error) {
      toast.error("Failed to create product.");
      console.error("Error:", error);
    }
  };

  return (
    <div data-aos="fade-up" className="min-h-[calc(100vh-4rem)] mt-16 px-4 sm:px-6 lg:px-8 py-10 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900">
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

          {/* Image URL & Alt Text */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cloudinary File Upload */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const formDataUpload = new FormData();
                  formDataUpload.append("image", file);
setloading(true);
                  try {
                    const res = await fetch(`${BASE_URL}/api/upload/cloud-image`, {
                      method: "POST",
                      body: formDataUpload,
                    });
                    const data = await res.json();

                    if (data?.url) {
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: data.url,
                      }));
                      toast.success("Image uploaded successfully!");
                    } else {
                      toast.error("Upload failed");
                    }
                  } catch (err) {
                    console.error("Upload error", err);
                    toast.error("Upload error");
                  }finally{
                    setloading(false);
                  }
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:ring-2 focus:ring-blue-500"
              />
              {/* Image preview */}
              {loading&&"Image Uploading..."}
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="preview"
                  className="mt-3 w-32 h-32 rounded-lg object-cover"
                />
              )}
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Alt Text
              </label>
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
              <label className="block text-lg font-semibold mb-2">
                Category
              </label>
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

          {/* Color */}
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

          {/* Size */}
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

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              
              className="bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold text-lg hover:bg-blue-800 transition duration-300"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateProduct;
