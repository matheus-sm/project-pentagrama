import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';
import "./Styles/Login.css"

function Login() {
  return (
    <Container className="ContainerEnter">
      <Row>
        <Col>
          <Form className="p-5 mt-5 rounded FormControl">
            <Form.Group className="mb-3" controlId="nickname">
              <Form.Label>Usuário</Form.Label>
              <Form.Control className="border" type="email" placeholder="Enter usuário" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control className="border" type="password" placeholder="password" />
            </Form.Group>
            <Button variant="success" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;