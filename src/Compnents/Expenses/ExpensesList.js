import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';

import "./ExpensesList.css";

import ExpenseItem from './ExpenseItem';
import ExpenseContext from '../../Context/expense-context';
export default function ExpensesList() {
    const expensectx = useContext(ExpenseContext);
  return (
    <Container fluid className='expenses-list'>
        {expensectx.expenses.map((expense) => {
            return <ExpenseItem expense={expense}/>
        })}
    </Container>
  )
}
