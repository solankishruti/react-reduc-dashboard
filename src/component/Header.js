import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "../pages/parts/Navigation";
import Sidebar from "../pages/parts/Sidebar";

const Header = () => {
  const history = useNavigate();
  useEffect(() => {
    const checkLoggedin = localStorage.getItem("userData");
    if (!checkLoggedin) {
      toast.error("User not logged in");
      history("/");
    }
  }, [history]);
  return (
    <>
      <Navigation />
      <Sidebar />
    </>
  );
};

export default Header;
