import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from '../redux/productSlice';
import { setAuthUser } from '../redux/authSlice';
const GetUser = () => {
    const dispatch = useDispatch();
    const {  user } = useSelector((store) => store.auth);
  
      useEffect(() => {
          const getuser = async () => {
              try {
                  const res = await axios.get(`http://localhost:8000/user/${user?._id}`, {
                      withCredentials: true,
                  })
                  if (res.data.success) {
                      dispatch(setAuthUser(res.data.user))
                      console.log(res.data.user);
  
                  }
              }
              catch (e) {
                  console.log(e.response.data.message)
                  // toast.error("Failed to fetch suggested users")
              }
          }
          getuser();
      }, [user,dispatch])
}

export default GetUser
