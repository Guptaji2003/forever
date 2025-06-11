import React, { useState } from "react";
// import { products } from '../assets/Product'
import Item from "../components/Item";
import { useParams } from "react-router-dom";
import ResultProducts from "../components/ResultProducts";
import { useSelector } from "react-redux";

const Men = () => {
  const { name } = useParams();
  const [menproducts, setmenproducts] = useState([]);
  const { allProducts, loading } = useSelector((store) => store.product);
  
  React.useEffect(() => {
    if (allProducts.length>0) {
      console.log(allProducts);
      const menProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === name
      );
      setmenproducts(menProducts);
    }
  }, [allProducts]);
  return (
    <div>
      <div className="container mx-auto mt-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
        <p className="text-center mb-12">
          Our new arrivals are built to withstand your activities while keeping
          you looking your best!
        </p>
        {loading ? "Loading" : <ResultProducts array={menproducts} />}
      </div>
    </div>
  );
};

export default Men;
