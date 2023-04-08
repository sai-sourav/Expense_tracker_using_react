import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import "./ExpenseItem.css";

export default function ExpenseItem(props) {
  const {amount, desc, category} = props.expense
  return (
    <Container className="expense-item">
      <Row className="align-items-center" style={{marginLeft: "4rem"}}>
        <Col xs={2}>
          <span>Money Spent : {amount}/-</span>
        </Col>
        <Col xs={4}>
          <span>Description : {desc}</span>
        </Col>
        <Col xs={2}>
          <span>Category : {category}</span>
        </Col>
        <Col>
          <Button variant="primary">Edit Expense</Button>
          <Button variant="danger" style={{marginLeft: "2rem"}}>Delete Expense</Button>
        </Col>
      </Row>
    </Container>
  );
}
