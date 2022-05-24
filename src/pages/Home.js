import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserStart,
  loadUsersStart,
  loadSingleUsersStart,
  updateUserStart,
} from "../redux/actions";
import { MDBBtn, MDBIcon, MDBSpinner, MDBTooltip } from "mdb-react-ui-kit";
import MUIDataTable from "mui-datatables";
// eslint-disable-next-line
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modals from "./Model";
import EditModal from "./Models/EditModel";
import { useFormik } from "formik";

const Home = () => {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const { allusers, loading, error } = useSelector((state) => state.data);
  const [togglemodal, checkToggle] = useState(false);
  const [toggleEditModal, checkEditToggle] = useState(false);
  const [UserID, setUserID] = useState(false);
  const [userEmail, setuserEmail] = useState(false);
  const columns = ["id", "Name", "Email", "Phone", "Address", "Action"];
  // const reload = () => window.location.reload();
  const validateuser = (item) => {
    const errors = {};
    if (!item.name && !formValue.name) {
      errors.name = "Please Enter Employee Name";
    } else if (item.name.length > 20) {
      errors.name = "Name cannot exceed 20 characters";
    }
    if (!item.address && !formValue.address) {
      errors.address = "Please Enter Employee Location";
    }
    if (!item.phone && !formValue.phone) {
      errors.phone = "Please Enter Employee phone";
    }
    if (item.phone) {
      if (!/^[0-9]{1,45}$/i.test(item.phone)) {
        errors.phone = "Invalid Phone number";
      }
    }
    if (!item.email && !formValue.email) {
      errors.email = "Please Enter Email ID";
    }
    if (item.email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(item.email)) {
        errors.email = "Invalid email address";
      }
    }
    for (let [name, value] of Object.entries(item)) {
      if (value) {
        setFormValue({ ...formValue, [name]: value });
      }
    }
    return errors;
  };
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validate: validateuser,
    onSubmit: (value) => {
      value = initialState;
      const id = UserID;
      dispatch(updateUserStart({ id, formValue }));
      checkEditToggle(false);
      setTimeout(() => dispatch(loadUsersStart()));
      toast.success("User Updated Successfully");
    },
  });

  const [formValue, setFormValue] = useState(formik);
  const { singleUsers } = useSelector((state) => state.data);
  const { name, email, phone, address } = formValue;
  useEffect(() => {
    dispatch(loadUsersStart());
    error && toast.error(error);
    setFormValue({ ...singleUsers });
  }, [dispatch, error, singleUsers]);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  const handleDeleet = () => {
    dispatch(deleteUserStart(UserID));
    checkToggle(false);
    toast.success("User Deleted Successfully");
  };
  const toggle = (id, email) => {
    setUserID(id);
    setuserEmail(email);
    checkToggle(true);
  };
  const toggleEdit = (item) => {
    checkEditToggle(true);
    dispatch(loadSingleUsersStart(item.id));
    setUserID(item.id);
  };
  const hideEditModal = () => {
    checkEditToggle(false);
  };
  const hideModal = () => {
    checkToggle(false);
  };
  const deleteUsersArray = [];

  const deleteSelectedUser = (e) => {
    e.data.forEach(function (index) {
      const userIDS = allusers[index.index].id;
      deleteUsersArray.push(userIDS);
    });
    dispatch(deleteUserStart(deleteUsersArray));
    setTimeout(() => toast.success("User Deleted Successfully"), 500);
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <Modals
              show={togglemodal}
              handleClose={hideModal}
              id={UserID}
              email={userEmail}
              handleDeleet={handleDeleet}
              nodeRef={nodeRef}
            ></Modals>
            <EditModal
              show={toggleEditModal}
              handleClose={hideEditModal}
              formik={formik}
              name={name}
              email={email}
              address={address}
              phone={phone}
              nodeRef={nodeRef}
            ></EditModal>
            <div className="container" style={{ marginTop: "50px" }}>
              <MUIDataTable
                pagination="true"
                style={{ overflowX: "scroll" }}
                title={"User Listing"}
                data={allusers.map((item, index) => {
                  return [
                    index + 1,
                    item.name,
                    item.email,
                    item.phone,
                    item.address,
                    <div className="row actionbtns">
                      <Link to={`/userInfo/${item.id}`}>
                        <MDBTooltip title="View" tag="p">
                          <MDBIcon
                            fas
                            icon="eye"
                            style={{ color: "#3b5998", marginBottom: "10px" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>{" "}
                      {/* <Link to={`/editUser/${item.id}`}> */}
                      <MDBBtn
                        tag="a"
                        color="none"
                        onClick={() => toggleEdit(item)}
                      >
                        <MDBTooltip title="Edit" tag="p">
                          <MDBIcon
                            fas
                            icon="pen"
                            style={{ color: "#55acee", marginBottom: "10px" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </MDBBtn>{" "}
                      <MDBBtn
                        tag="a"
                        color="none"
                        onClick={() => toggle(item.id, item.email)}
                      >
                        <MDBTooltip title="Delete" tag="p">
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "#dd4b39" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </MDBBtn>
                    </div>,
                  ];
                })}
                columns={columns}
                options={{
                  rowsPerPage: 2,
                  rowsPerPageOptions: [2, 5, 10, 15, 20],
                  onRowsDelete: (e) => deleteSelectedUser(e),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
