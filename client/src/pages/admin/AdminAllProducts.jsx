import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchAllProducts } from '../../redux/slice/productSlice';
import { Link } from 'react-router-dom';
import Confirm from '../../components/Confirm';

const AdminAllProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, totalProduct } = useSelector((state) => state.product);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDeleteRequest = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(selectedId));
    setConfirmOpen(false);
  };

  return (
    <div data-aos="fade-up" className="min-h-screen bg-gray-100 px-4 md:px-20 py-6">
      <h1 className="text-4xl font-bold mb-4">🛍️ All Products</h1>
      <p className="mb-6 text-gray-600">Total Products: {totalProduct}</p>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading products...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg h-130 overflow-y-scroll">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0  text-gray-700">
              <tr>
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.length > 0 ? (
                allProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 border-b text-sm">
                    <td className="p-4">
                      <img
                        src={product?.image?.[0]?.url || "/default-product.png"}
                        alt={product?.image?.[0]?.alttext || "Product"}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{product.name}</td>
                    <td className="p-4 text-green-600">₹{product.price}</td>
                    <td className="p-4 text-gray-700">{product.category}</td>
                    <td className="p-4 space-x-2">
                      <Link
                        to={`/admin/updateproduct/${product._id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteRequest(product._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/product/${product._id}`}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmOpen && (
        <Confirm
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this product?"
        />
      )}
    </div>
  );
};

export default AdminAllProducts;
