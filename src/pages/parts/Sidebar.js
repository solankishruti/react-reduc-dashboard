import React from "react";
import logo from "../../public/dist/img/AdminLTELogo.png";
import userlogo from "../../public/dist/img/user2-160x160.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions";

const Sidebar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(logoutUser());
    history("/");
  };
  const numberCart = localStorage.getItem("numberCart");
  const User_email = localStorage.getItem("userData");
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to={"/dashboard"} className="brand-link">
        <img
          src={logo}
          alt="AdminLTE"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={userlogo} className="img-circle elevation-2" alt="User" />
          </div>
          <div className="info">{User_email}</div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link to={"#"} className="nav-link">
                {/* <i className="nav-icon fas fa-book"></i> */}
                <p>
                  Users
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    All Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addUser" className="nav-link">
                    Add User
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to={"#"} className="nav-link">
                <p>
                  Products
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/allProducts">All Products</Link>
                </li>
                <li className="nav-item"></li>
              </ul>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart">Cart [{numberCart}] </Link>
            </li>
            <li className="nav-item">
              <p className="nav-link" onClick={() => handleLogout()}>
                Logout
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
