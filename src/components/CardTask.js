import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CardTask = (props) => {
  const deleteTaskHandler = () => {
    props.deleteTaskHandler(props.id);
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} bg="secondary" className="mb-3">
        <Card.Body>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3>{props.title}</h3>
            <Button
              variant="secondary"
              style={{ color: "red" }}
              onClick={() => deleteTaskHandler(props.id)}
            >
              X
            </Button>
          </Card.Title>

          <Card.Text>{props.text}</Card.Text>

          <Card.Footer style={{ background: "#878484" }}>
            {props.tag}
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardTask;
