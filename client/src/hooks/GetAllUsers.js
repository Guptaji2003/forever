import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from '../redux/productSlice';
import { setAllUsers } from '../redux/authSlice';
const GetAllUsers = () => {
    const dispatch = useDispatch();
    const {  user } = useSelector((store) => store.auth);
  
      useEffect(() => {
          const allusers = async () => {
              try {
                  const res = await axios.get("http://localhost:8000/alluser", {
                      withCredentials: true,
                  })
                  if (res.data.success) {
                      dispatch(setAllUsers(res.data.users))
                      console.log(res.data.users);
  
                  }
              }
              catch (e) {
                  console.log(e.response.data.message)
                  // toast.error("Failed to fetch suggested users")
              }
          }
          allusers();
      }, [dispatch,user])
}

export default GetAllUsers
