import { createContext, useState } from "react";

const ExpenseContext = createContext({
    expenses : [],
    updateExpenses: (newexpense) => {}
})


export const ExpenseContextProvider = (props) => {
    const [expenses, setExpenses] = useState([]);

    const updateExpenses = (newItem) => {
        setExpenses(prev => {
            return [newItem, ...prev]
        })
    }

    const values = {
        expenses : expenses,
        updateExpenses : updateExpenses
    }

    return(
        <ExpenseContext.Provider value={values}>{props.children}</ExpenseContext.Provider>
    )
}

export default ExpenseContext;