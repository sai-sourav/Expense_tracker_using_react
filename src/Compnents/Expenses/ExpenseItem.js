import React, { useRef, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./ExpenseItem.css";
import { Form, FloatingLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../Redux/Reducer";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function ExpenseItem(props) {
  const [iseditmode, setiseditMode] = useState(false);
  const { id, amount, desc, category } = props.expense;
  const dispatch = useDispatch()
  const amountref = useRef();
  const descref = useRef();
  const catref = useRef();
  const updateHandler = async () => {
    if (!iseditmode) {
      setiseditMode((prev) => !prev);
    } else {
      try {
        const obj = {
          amount: amountref.current.value,
          desc: descref.current.value,
          category: catref.current.value,
        };
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            idToken: localStorage.getItem("authToken"),
          }
        );
        const users = response.data.users;
        if (users[0]) {
          const username = users[0].email.split("@")[0];
          await axios.put(
            `https://expensetracker-6bf2c-default-rtdb.asia-southeast1.firebasedatabase.app/${username}_expenses/${id}.json`,
            obj
          );
          setiseditMode((prev) => !prev);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const deleteHandler = async () => {
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
        await axios.delete(
          `https://expensetracker-6bf2c-default-rtdb.asia-southeast1.firebasedatabase.app/${username}_expenses/${id}.json`
        );
        dispatch(expenseAction.deleteExpense(id))
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="expense-item" >
      <Row className="align-items-center" style={{ marginLeft: "9rem" }}>
        <Col xs={2}>
          <FloatingLabel controlId="amount" label="Money Spent">
            <Form.Control
              type="text"
              placeholder="money"
              className="inputfield"
              defaultValue={amount}
              ref={amountref}
              disabled={!iseditmode}
            />
          </FloatingLabel>
        </Col>
        <Col xs={2}>
          <FloatingLabel controlId="desc" label="Description">
            <Form.Control
              type="text"
              placeholder="description"
              className="inputfield"
              defaultValue={desc}
              ref={descref}
              disabled={!iseditmode}
            />
          </FloatingLabel>
        </Col>
        <Col xs={2}>
          <FloatingLabel controlId="category" label="Category">
            <Form.Select
              ref={catref}
              defaultValue={category}
              disabled={!iseditmode}
              className="inputfield"
            >
              <option>Select an option</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="shopping">Shopping</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={5} style={{ justifyContent: "center", display: "flex" }}>
          <Button variant="primary" onClick={updateHandler}>
            {iseditmode ? "Update Expense" : "Edit Expense"}
          </Button>
          <Button
            variant="danger"
            style={{ marginLeft: "2rem" }}
            onClick={deleteHandler}
          >
            Delete Expense
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
