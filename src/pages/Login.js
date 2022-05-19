import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadUsersByIDStart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";

const Login = () => {
  const [user, userLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    userLogin({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const { error, loggedin } = useSelector((state) => state.data);
  const [login, checkLogin] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(loadUsersByIDStart(user));
      checkLogin(true);
    }
  };

  useEffect(() => {
    if (login) {
      if (!loggedin) {
        toast.error(error);
        history("/");
      } else {
        history("/dashboard");
        localStorage.setItem("userData", user.email);
      }
    }
  }, [login, error, history, loggedin, user.email]);

  return (
    <div className="hold-transition login-page">
      {/* <ToastContainer /> */}
      <div className="login-box">
        <div className="login-logo">
          <b>Admin</b>LTE
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form method="post" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
