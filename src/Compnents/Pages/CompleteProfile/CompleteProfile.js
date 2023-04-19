import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./CompleteProfile.css";
import axios from "axios";
import { useSelector } from "react-redux";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function CompleteProfile() {
  const [isEditMode, updateisEditMode] = useState(true);
  const firstnameref = useRef();
  const secondnameref = useRef();
  const linkref = useRef();
  const Profiledetails = useSelector(state => state.user.Profiledetails)

  useEffect(() => {
    (async() => {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          idToken: localStorage.getItem("authToken"),
        }
      );
      const users = response.data.users;
      if(users[0].displayName){
        firstnameref.current.value = users[0].displayName.split(" ")[0];
        secondnameref.current.value = users[0].displayName.split(" ")[1];
        linkref.current.value = users[0].photoUrl;
        updateisEditMode(false);
      }else{
        updateisEditMode(true);
      }
    })();
  },[])

  let buttons = (
    <Col className="text-center">
      <Button
        variant="primary"
        type="submit"
        style={{ width: "100%" }}
      >
        Submit
      </Button>
    </Col>
  );
  // if (userctx.Profiledetails) {
    if (Profiledetails) {  
    buttons = (
      <>
        <Col className="text-center">
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={() => updateisEditMode((prev) => !prev)}
          >
            Edit
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%" }}
            disabled={!isEditMode}
          >
            Submit
          </Button>
        </Col>
      </>
    );
  }
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
                  disabled={!isEditMode}
                />
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  ref={secondnameref}
                  disabled={!isEditMode}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Profile Pic Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="link"
                ref={linkref}
                disabled={!isEditMode}
              />
            </Form.Group>
            <Row className="justify-content-lg-center">
              {buttons}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
