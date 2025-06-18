import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchAllProducts } from '../../redux/slice/productSlice';
import { Link } from 'react-router-dom';
import Confirm from '../../components/Confirm';

const AdminAllProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading,totalProduct } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

  const handleDelete = (id) => {
    // if (window.confirm("Are you sure to delete this product?")) {
    //   dispatch(deleteProduct(id));
    // }

    <Confirm open={true}/>
  };

  return (
    <div className="w-screen h-140 overflow-y-scroll px-20 font-sans">
      <h1 className="text-4xl font-bold mb-8">Admin - Product List   </h1>
      <p>Total Product:{totalProduct}</p>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody >
                
              {allProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 border-b">
                  <td className="p-2 border-b">
                    <img
                      src={product?.image?.[0]?.url}
                      alt="product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-2  font-medium">{product.name}</td>
                  <td className="p-2  text-green-600">₹{product.price}</td>
                  <td className="p-2 ">{product.category}</td>
                  <td className="p-2 my-5  flex gap-2">
                    <Link
                      to={`/admin/updateproduct/${product._id}`}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/product/${product._id}`}
                      className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {allProducts?.length === 0 && (
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
    </div>
  );
}

export default AdminAllProducts
