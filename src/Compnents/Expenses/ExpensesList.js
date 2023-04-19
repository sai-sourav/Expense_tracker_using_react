import React from "react";
import { Container } from "react-bootstrap";
import "./ExpensesList.css";
import { useDispatch, useSelector } from "react-redux";

import ExpenseItem from "./ExpenseItem";
import { useEffect } from "react";
import axios from "axios";
import { expenseAction } from "../../Redux/Reducer";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function ExpensesList() {
  const dispatch = useDispatch();
  const expenseState = useSelector((state) => state.expense.expenses);
  useEffect(() => {
    (async () => {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          idToken: localStorage.getItem("authToken"),
        }
      );
      const users = response.data.users;
      if (users[0]) {
        const username = users[0].email.split("@")[0];
        try {
          const resp = await axios.get(
            `https://expensetracker-6bf2c-default-rtdb.asia-southeast1.firebasedatabase.app/${username}_expenses.json`
          );
          if (resp.data) {
            const expensesdata = Object.keys(resp.data).map((key) => {
              return {
                id: key,
                ...resp.data[key],
              };
            });
            dispatch(expenseAction.updateArray(expensesdata));
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [dispatch]);
  return (
    <Container fluid className="expenses-list">
      {expenseState.map((expense) => {
        return <ExpenseItem key={expense.id} expense={expense} />;
      })}
    </Container>
  );
}
