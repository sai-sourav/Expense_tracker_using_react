import React, { useRef } from "react";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./CompleteProfile.css";
import axios from "axios";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function CompleteProfile() {
  const firstnameref = useRef();
  const secondnameref = useRef();
  const linkref = useRef();
  const phoneref = useRef();
  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken: localStorage.getItem("authToken"),
          displayName: `${firstnameref.current.value} ${secondnameref.current.value}`,
          photoUrl: linkref.current.value,
        }
      );
      e.target.reset();
      alert("Profile updated successfully");
    } catch (err) {
      const { error } = err.response.data;
      alert(`Error! : ${error.message}`);
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={3}>
          <Form className="completeform" onSubmit={clickHandler}>
            <Row>
              <Col>
                <h2>Complete Profile</h2>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  ref={firstnameref}
                />
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  ref={secondnameref}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Profile Pic Link</Form.Label>
              <Form.Control type="text" placeholder="link" ref={linkref} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="phone" ref={phoneref} />
            </Form.Group>

            <Row className="justify-content-lg-center">
              <Col className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "60%" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
