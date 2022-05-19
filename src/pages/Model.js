import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Modals = ({ handleClose, show, id, email, handleDeleet }) => {
  return (
    <div>
      <Modal isOpen={show}>
        <ModalHeader>Delete</ModalHeader>
        <ModalBody>are you sure to delete {email} ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleet}>
            Delete Me!
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Modals;
