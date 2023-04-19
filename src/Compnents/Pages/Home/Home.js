import React from "react";
import AddExpense from "../../addExpenseForm/addExpense";
import ExpensesList from "../../Expenses/ExpensesList";

export default function Home() {
  
  return (
    <>
      <AddExpense />
      <ExpensesList />
    </>
  );
}
