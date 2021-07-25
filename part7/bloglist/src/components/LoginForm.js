import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
  <>
    <h2>Blog App Login</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>
          Username
        </Form.Label>
        <Form.Control type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control type="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="outline-primary" id="login-button" type="submit">Login</Button>
    </Form>
  </>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
};

export default LoginForm;