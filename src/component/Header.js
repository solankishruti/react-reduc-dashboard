import React, { useEffect } from "react";
// import { MDBSpinner } from "mdb-react-ui-kit";
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

  // const Navigation = lazy(() => import("../pages/parts/Navigation"));
  // const Sidebar = lazy(() => import("../pages/parts/Sidebar"));

  return (
    <>
      {/* <Suspense
        fallback={
          <MDBSpinner style={{ marginTop: "150px" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        }
      > */}
      <Navigation />
      <Sidebar />
      {/* </Suspense> */}
    </>
  );
};

export default Header;
