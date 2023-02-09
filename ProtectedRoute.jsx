import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { LOGIN_SERVICE_URL } from '../data/Constant';

const ProtectedRoute = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  let location = useLocation();

  const getMyUserData = () => {
    axios
      .get(`${LOGIN_SERVICE_URL}/kula-core/my-profile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then((res) => {
        setUser(res.data.data);
        setLoading(false)
      })
      .catch((err) => {
        setUser(null)
        setLoading(false)
      });
  };

  useEffect(() => {
    getMyUserData();
  }, []);

  if (!user && !loading) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return user && !loading && <Outlet />

};

export default ProtectedRoute;
