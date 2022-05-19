import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";
import { loadSingleUsersStart } from "../redux/actions";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { singleUsers } = useSelector((state) => state.data);
  const [editMode, setEditMode] = useState(false);
  const { name, email, phone, address } = formValue;
  const history = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(loadSingleUsersStart(id));
      setEditMode(true);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (editMode) {
      setFormValue({ ...singleUsers });
    }
  }, [singleUsers, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => history("/home"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => history("/home"), 500);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <MDBValidation
              className="row g-3"
              style={{ marginTop: "100px" }}
              noValidate
              onSubmit={handleSubmit}
            >
              <p className="fs-2 fw-bold">
                {!editMode ? "Add User Detail" : "Update User Detail"}
              </p>
              <div
                style={{
                  margin: "auto",
                  padding: "15px",
                  maxWidth: "400px",
                  alignContent: "center",
                }}
              >
                <MDBInput
                  value={name || ""}
                  name="name"
                  type="text"
                  onChange={onInputChange}
                  required
                  label="Name"
                  validation="Please provide a name"
                />
                <br />
                <MDBInput
                  value={email || ""}
                  name="email"
                  type="email"
                  onChange={onInputChange}
                  required
                  label="Email"
                  validation="Please provide an email"
                />
                <br />
                <MDBInput
                  value={phone || ""}
                  name="phone"
                  type="number"
                  onChange={onInputChange}
                  required
                  label="Phone"
                  validation="Please provide a phone no."
                />
                <br />
                <MDBInput
                  value={address || ""}
                  name="address"
                  type="text"
                  onChange={onInputChange}
                  required
                  label="Address"
                  validation="Please provide an address"
                />
                <br />
                <div className="col-12">
                  <MDBBtn style={{ marginRight: "10px" }} type="submit">
                    {!editMode ? "Add" : "Update"}
                  </MDBBtn>
                  <MDBBtn onClick={() => history("/home")} color="danger">
                    Go Back
                  </MDBBtn>
                </div>
              </div>
            </MDBValidation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditUser;
