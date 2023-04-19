import React, { useRef } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
} from "react-bootstrap";

import "./addExpense.css";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../Redux/Reducer";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function AddExpense() {
  const dispatch = useDispatch();
  const amountref = useRef();
  const descref = useRef();
  const catref = useRef();

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const obj = {
      amount: amountref.current.value,
      desc: descref.current.value,
      category: catref.current.value,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          idToken: localStorage.getItem("authToken"),
        }
      );
      const users = response.data.users;
      if (users[0]) {
        const username = users[0].email.split("@")[0];
        await axios.post(
          `https://expensetracker-6bf2c-default-rtdb.asia-southeast1.firebasedatabase.app/${username}_expenses.json`,
          obj
        );
        dispatch(expenseAction.addExpense(obj));
      }
    } catch (err) {
      console.log(err);
    }
    evt.target.reset();
  };
  return (
    <Form className="add-expense-form" onSubmit={submitHandler}>
      <Container fluid>
        <Row className="align-items-center">
          <Col>
            <FloatingLabel controlId="amount" label="Money Spent">
              <Form.Control type="text" placeholder="money" ref={amountref} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="desc" label="Description">
              <Form.Control
                type="text"
                placeholder="description"
                ref={descref}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="category" label="Category">
              <Form.Select ref={catref}>
                <option>Select an option</option>
                <option value="food">Food</option>
                <option value="petrol">Petrol</option>
                <option value="shopping">Shopping</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              style={{ padding: "0.8rem", width: "10rem", marginLeft: "3rem" }}
            >
              Add Expense
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
