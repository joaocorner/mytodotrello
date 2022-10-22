import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useState } from "react";

const FormTask = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredTask, setEnteredTask] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // get the value of the title
  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  // get the value of the textarea
  const taskChangeHandler = (e) => {
    setEnteredTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // alert if any field is empty
    if (!selectedColumn || !enteredTitle || !enteredTask) {
      alert("Please fill all the fields");
      return;
    }

    const taskData = {
      title: enteredTitle,
      text: enteredTask,
      tag: selectedTag,
      column: selectedColumn,
      id: Math.random().toString(),
    };

    props.saveTaskHandler(taskData);
    props.handleClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" onChange={titleChangeHandler} autoFocus />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Task</Form.Label>
        <Form.Control as="textarea" onChange={taskChangeHandler} rows={3} />
      </Form.Group>

      <DropdownButton
        id="dropdown-basic-button"
        title={selectedTag ? selectedTag : "Select a tag"}
        className="d-inline mx-2"
      >
        {props.tag.map((tag) => (
          <Dropdown.Item
            key={tag.id}
            onClick={() => setSelectedTag(tag.tag)}
            value={tag.tag}
          >
            {tag.tag}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton
        id="dropdown-basic-button"
        title={selectedColumn ? selectedColumn : "Select a column"}
        className="d-inline mx-2"
      >
        {props.column.map((column) => (
          <Dropdown.Item
            key={column.id}
            onClick={() => setSelectedColumn(column.column)}
            value={column.column}
          >
            {column.column}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <Button variant="primary" type="submit" className="d-inline mx-2">
        Save Changes
      </Button>
    </Form>
  );
};

export default FormTask;
