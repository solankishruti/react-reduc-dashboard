import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import { MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modals from "./Model";

const Home = () => {
  const dispatch = useDispatch();
  const { allusers, loading, error } = useSelector((state) => state.data);
  const [togglemodal, checkToggle] = useState(false);
  const [UserID, setUserID] = useState(false);
  const [userEmail, setuserEmail] = useState(false);
  const columns = ["id", "Name", "Email", "Phone", "Address", "Action"];
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

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
  const hideModal = () => {
    checkToggle(false);
  };

  const deleteSelectedUser = (e) => {
    console.log(e);
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
            ></Modals>
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
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        onClick={() => toggle(item.id, item.email)}
                      >
                        {/* <MDBTooltip title="Delete" tag="a"> */}
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                        {/* </MDBTooltip> */}
                      </MDBBtn>{" "}
                      <Link to={`/editUser/${item.id}`}>
                        {/* <MDBTooltip title="Edit" tag="a"> */}
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", marginBottom: "10px" }}
                          size="lg"
                        />
                        {/* </MDBTooltip> */}
                      </Link>{" "}
                      <Link to={`/userInfo/${item.id}`}>
                        {/* <MDBTooltip title="View" tag="a"> */}
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", marginBottom: "10px" }}
                          size="lg"
                        />
                        {/* </MDBTooltip> */}
                      </Link>
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
