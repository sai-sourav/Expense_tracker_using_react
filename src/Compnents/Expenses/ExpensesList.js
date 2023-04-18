import React, { useContext } from "react";
import { Container } from "react-bootstrap";

import "./ExpensesList.css";

import ExpenseItem from "./ExpenseItem";
// import ExpenseContext from '../../Context/expense-context';
import { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../Context/user-context";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function ExpensesList() {
  // const expensectx = useContext(ExpenseContext);
  const userctx = useContext(UserContext);
  const [expenses, changeExpenses] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          idToken: localStorage.getItem("authToken"),
        }
      );
      const users = response.data.users;
      if(users[0]){
      const username = users[0].email.split("@")[0]
        try {
          const resp = await axios.get(
            `https://expensetracker-6bf2c-default-rtdb.asia-southeast1.firebasedatabase.app/${username}_expenses.json`
          );
          if (resp.data) {
            changeExpenses(Object.values(resp.data));
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [userctx.username]);
  return (
    <Container fluid className="expenses-list">
      {expenses.map((expense) => {
        return <ExpenseItem expense={expense} />;
      })}
    </Container>
  );
}
