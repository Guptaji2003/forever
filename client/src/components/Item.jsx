import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { setSelectedProduct } from "../redux/productSlice";
// import "./Item.css"; // Optional if you want to add external styling

const Item = ({ product }) => {
  const dispatch = useDispatch();

  const currency="";
  return (
      <Link onClick={()=>dispatch(setSelectedProduct(product))} to={`/product/${product._id}`}>
      <div className="border p-4 rounded-lg shadow-sm">
      <img
        src={product.image}
        alt="Carabiner Set"
        className="rounded-lg w-full"
      />
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-gray-600">{currency}{product.price}</p>
    </div>
      </Link>
  );
};

export default Item;
