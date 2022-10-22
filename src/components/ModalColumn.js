import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";

function ModalColumn(props) {
  const [show, setShow] = useState(false);
  const [enteredColumn, setEnteredColumn] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columnChangeHandler = (e) => {
    setEnteredColumn(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredColumn) {
      alert("Please fill all the fields");
      return;
    }

    const columnData = {
      id: Math.random().toString(),
      column: enteredColumn,
    };

    props.saveColumnHandler(columnData);
    handleClose();
  };

  return (
    <>
      <div variant="dark" onClick={handleShow}>
        Manage Columns
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Columns</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {props.column.map((column) => (
              <Card
                style={{ minWidth: "12rem" }}
                bg="secondary"
                className="mb-3"
                key={column.id}
              >
                <Card.Body>
                  <Card.Title
                    className="m-0"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3>{column.column}</h3>
                    <Button variant="secondary" style={{ color: "red" }}>
                      X
                    </Button>
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicColumn" className="mb-3">
              <Form.Label>New Column</Form.Label>
              <Form.Control
                type="textarea"
                onChange={columnChangeHandler}
                autoFocus
                placeholder="Enter column name"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalColumn;
