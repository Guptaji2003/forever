import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAuthUser } from "../redux/authSlice";
// import { setAuthUser } from '../redux/authSlice';

const UseAddToCart = () => {
  const dispatch = useDispatch();
  const addtocart = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/addtocart/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        //   toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data.message);
    }
  };
  const whislist = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/whislist/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        //   toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data.message);
    }
  };
  return { addtocart,whislist };
};

export default UseAddToCart;
