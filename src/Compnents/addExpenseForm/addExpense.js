import React, { useContext, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
} from "react-bootstrap";

import "./addExpense.css";
import ExpenseContext from "../../Context/expense-context";

export default function AddExpense() {
  const expensectx = useContext(ExpenseContext);
  const amountref = useRef();
  const descref = useRef();
  const catref = useRef();

  const submitHandler = (evt) => {
    evt.preventDefault();
    const obj = {
      amount : amountref.current.value,
      desc : descref.current.value,
      category : catref.current.value
    }
    expensectx.updateExpenses(obj);
    evt.target.reset();
  }
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
              <Form.Control type="text" placeholder="description" ref={descref} />
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
