import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { setProducts } from '../../redux/productSlice';
import axios from 'axios'

const AdminCreateProduct = () => {
    const dispatch = useDispatch();

  const {products}=useSelector(store=>store.product);

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        category: "",
        description: "",
      });
    
      const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/createproduct", formData, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            if (res.data.success) {
              dispatch(setProducts([res.data.product,...products]));
              toast.success(res.data.message);
            //   navigate("/");
            } else {
              toast.error(res.data.error);
            }
            console.log(res.data);
          } catch (error) {
            console.error("Error:", error);
          }
      };
    
      return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
    
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
    
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
    
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      );
}

export default AdminCreateProduct
