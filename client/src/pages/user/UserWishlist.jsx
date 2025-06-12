import React from 'react'
import ResultProducts from '../../components/ResultProducts'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserWishlist = () => {
    // const { user } = useSelector((store) => store.auth);
  
  return (
   <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-6">
  <div className="bg-white shadow-md rounded-xl p-10 max-w-lg w-full text-center">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" // you can change this to your own empty icon
      alt="Empty Wishlist"
      className="mx-auto mb-6 w-32 h-32 opacity-80"
    />
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
    <p className="text-gray-500 mb-6">Looks like you haven’t added any products to your wishlist yet.</p>
    <Link to="/products">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        🛍️ Continue Shopping
      </button>
    </Link>
  </div>
</div>

  )
}

export default UserWishlist
