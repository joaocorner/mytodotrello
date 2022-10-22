import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormTask from "./FormTask";

function ModalTask(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        New Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTask
            handleClose={handleClose}
            saveTaskHandler={props.saveTaskHandler}
            column={props.column}
            tag={props.tag}
          />{" "}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalTask;
