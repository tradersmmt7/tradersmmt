import React from "react";
import { Form, Alert } from "react-bootstrap";
import { CustomForm } from "./styles";
import { PrimaryButton } from "../../GlobalComponents/commonStyles";
const Register = ({
  handleSubmit,
  handleChange,
  register,
  registrationStatus,
}) => {
  return (
    <CustomForm>
      {registrationStatus.success !== null && (
        <Alert variant={registrationStatus.success ? "success" : "danger"}>
          {registrationStatus.message}
        </Alert>
      )}

      <Form onSubmit={(e) => handleSubmit(e, 2)} autoComplete={false}>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="fullName"
            onChange={(e) => handleChange(e, 2)}
            value={register.fullName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="emailId"
            onChange={(e) => handleChange(e, 2)}
            value={register.emailId}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone number"
            name="phone"
            onChange={(e) => handleChange(e, 2)}
            value={register.phone}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e, 2)}
            value={register.password}
          />
        </Form.Group>

        <PrimaryButton variant="primary" type="submit">
          register
        </PrimaryButton>
        <Form.Text className="text-muted">Your data is safe with us</Form.Text>
      </Form>
    </CustomForm>
  );
};

export default Register;
