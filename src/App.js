import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalTask from "./components/ModalTask";
import CardTask from "./components/CardTask";
import "./App.css";
import ModalColumn from "./components/ModalColumn";
import ModalTag from "./components/ModalTag";
import { Tasks } from "./components/database";

function App() {
  const [tasks, setTasks] = useState(Tasks);
  const [newColumn, setNewColumn] = useState([
    { id: 1, column: "To Do" },
    { id: 2, column: "In Progress" },
  ]);
  const [newTag, setNewTag] = useState([
    { id: 1, tag: "Personal" },
    { id: 2, tag: "Work" },
  ]);

  const saveTaskHandler = (enteredTaskData) => {
    setTasks((prevTasks) => {
      return [enteredTaskData, ...prevTasks];
    });
  };

  function formatColumns(tasks) {
    const columns = [...new Set(tasks.map((task) => task.column))];
    return columns.reduce((acc, column) => {
      const _tasks = tasks.filter((task) => task.column === column);
      return [...acc, { column: column, tasks: _tasks }];
    }, []);
  }

  const formatedTasks = formatColumns(tasks);

  const saveColumnHandler = (enteredColumnData) => {
    setNewColumn((prevColumn) => {
      return [enteredColumnData, ...prevColumn];
    });
  };

  const saveTagHandler = (enteredTagData) => {
    setNewTag((prevTag) => {
      return [enteredTagData, ...prevTag];
    });
  };

  // Delete Task
  const deleteTaskHandler = (taskId) => {
    console.log("deletar task");
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container className="fluid">
          <Navbar.Brand href="#home">ToDo List</Navbar.Brand>
          <Nav>
            <Nav.Link href="#home">
              <ModalTask
                saveTaskHandler={saveTaskHandler}
                column={newColumn}
                tag={newTag}
              />
            </Nav.Link>
            <DropdownButton
              as={ButtonGroup}
              id="dropdown-button-drop-right"
              variant="dark"
              title="Columns"
            >
              {newColumn.map((column) => (
                <Dropdown.Item eventKey={column.id}>
                  {column.column}
                </Dropdown.Item>
              ))}

              {newColumn.length === 0 ? "" : <Dropdown.Divider />}

              <Dropdown.Item>
                <ModalColumn
                  column={newColumn}
                  saveColumnHandler={saveColumnHandler}
                />
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton as={ButtonGroup} variant="dark" title="Tag">
              {newTag.map((tag) => (
                <Dropdown.Item key={tag.tag} eventKey={tag.id}>
                  {tag.tag}
                </Dropdown.Item>
              ))}

              {newTag.length === 0 ? "" : <Dropdown.Divider />}

              <Dropdown.Item>
                <ModalTag tag={newTag} saveTagHandler={saveTagHandler} />
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Container>
      </Navbar>

      <div className="container-columns">
        {formatedTasks.map((column) => (
          <Container className="container-column">
            <div key={column.column}>
              <h2 className="text-center">{column.column}</h2>
              {column.tasks.map((task) => (
                <CardTask
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  text={task.text}
                  tag={task.tag}
                  column={task.column}
                  deleteTaskHandler={deleteTaskHandler}
                />
              ))}
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
}

export default App;
