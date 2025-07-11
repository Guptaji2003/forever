import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); 

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
    return user.role==="admin" ? children : null;
};

export default ProtectedAdminRoute;
