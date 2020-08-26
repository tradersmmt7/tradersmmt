import React from "react";
import { Form, Alert } from "react-bootstrap";
import { CustomForm } from "./styles";
import { PrimaryButton } from "../../GlobalComponents/commonStyles";

const Login = ({ handleSubmit, handleChange, login, loginStatus }) => {
  return (
    <CustomForm>
      {loginStatus.success !== null && (
        <Alert variant={loginStatus.success ? "success" : "danger"}>
          {loginStatus.message}
        </Alert>
      )}
      <Form onSubmit={(e) => handleSubmit(e, 1)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="emailId"
            onChange={(e) => handleChange(e, 1)}
            value={login.emailId}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e, 1)}
            value={login.password}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <PrimaryButton variant="primary" type="submit">
          login
        </PrimaryButton>
      </Form>
    </CustomForm>
  );
};

export default Login;
