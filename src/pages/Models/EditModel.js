import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditModal = ({
  handleClose,
  show,
  formik,
  name,
  email,
  address,
  phone,
}) => {
  return (
    <div>
      <Modal isOpen={show}>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <p>
                <label htmlFor="Name">Name : </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <br />
                {formik.touched.name && formik.errors.name ? (
                  <span style={{ color: "red" }}>{formik.errors.name}</span>
                ) : null}
              </p>
              <p>
                <label htmlFor="EmailId">Email: </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <br />
                {formik.touched.email && formik.errors.email ? (
                  <span style={{ color: "red" }}>{formik.errors.email}</span>
                ) : null}
              </p>
              <p>
                <label htmlFor="Location">Address : </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <br />
                {formik.touched.address && formik.errors.address ? (
                  <span style={{ color: "red" }}>{formik.errors.address}</span>
                ) : null}
              </p>
              <p>
                <label htmlFor="Phone">Phone : </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <br />
                {formik.touched.phone && formik.errors.phone ? (
                  <span style={{ color: "red" }}>{formik.errors.phone}</span>
                ) : null}
              </p>
              <ModalFooter>
                <Button type="submit" color="success">
                  Update
                </Button>
                {/* <Button color="success" onClick={"#"}> */}
                {/* Update */}
                {/* </Button>{" "} */}
                <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </div>{" "}
        </ModalBody>
        {/* <ModalFooter>
          <Button color="success" onClick={"#"}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default EditModal;
