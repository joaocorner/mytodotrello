import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";

function ModalTag(props) {
  const [show, setShow] = useState(false);
  const [enteredTag, setEnteredTag] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tagChangeHandler = (e) => {
    setEnteredTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredTag) {
      alert("Please fill all the fields");
      return;
    }

    const tagData = {
      id: Math.random().toString(),
      tag: enteredTag,
    };

    props.saveTagHandler(tagData);
    handleClose();
  };

  return (
    <>
      <div variant="dark" onClick={handleShow}>
        Manage Tags
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {props.tag.map((tag) => (
              <Card
                style={{ minWidth: "12rem" }}
                bg="secondary"
                className="mb-3"
                key={tag.id}
              >
                <Card.Body>
                  <Card.Title
                    className="m-0"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3>{tag.tag}</h3>
                    <Button variant="secondary" style={{ color: "red" }}>
                      X
                    </Button>
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTag" className="mb-3">
              <Form.Label>New Tag</Form.Label>
              <Form.Control
                type="textarea"
                onChange={tagChangeHandler}
                autoFocus
                placeholder="Enter tag name"
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

export default ModalTag;
