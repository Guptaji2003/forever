import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from '../redux/productSlice';
const GetAllProducts = () => {
    const dispatch = useDispatch();
    const {  user } = useSelector((store) => store.auth);
  
      useEffect(() => {
          const allproduct = async () => {
              try {
                  const res = await axios.get("http://localhost:8000/allproduct", {
                      withCredentials: true,
                  })
                  if (res.data.success) {
                      dispatch(setProducts(res.data.products))
                      console.log(res.data.products);
  
                  }
              }
              catch (e) {
                  console.log(e.response.data.message)
                  // toast.error("Failed to fetch suggested users")
              }
          }
          allproduct();
      }, [dispatch,user])
}

export default GetAllProducts
