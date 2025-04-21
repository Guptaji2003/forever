import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
// import { setProducts } from '../redux/productSlice';
import { setOrders } from '../redux/orderSlice';
const GetAllOrders = () => {
    const dispatch = useDispatch();
    const {  user } = useSelector((store) => store.auth);
  
      useEffect(() => {
          const allorder = async () => {
              try {
                  const res = await axios.get("http://localhost:8000/allorder", {
                      withCredentials: true,
                  })
                  if (res.data.success) {
                      dispatch(setOrders(res.data.orders))
                      console.log(res.data.orders);
  
                  }
              }
              catch (e) {
                  console.log(e.response.data.message)
                  // toast.error("Failed to fetch suggested users")
              }
          }
          allorder();
      }, [dispatch,user])
}

export default GetAllOrders
