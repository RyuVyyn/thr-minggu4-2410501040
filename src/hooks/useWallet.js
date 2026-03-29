import { useMemo } from "react";
import { ACTIONS, useRayaBudgetContext } from "../context/RayaBudgetContext";

export function useWallet() {
  const { transactions, dispatch } = useRayaBudgetContext();

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
    };
  }, [transactions]);

  function addIncome({ from, amount, date }) {
    dispatch({
      type: ACTIONS.ADD_INCOME,
      payload: {
        id: `${Date.now()}-income`,
        type: "income",
        from: from.trim(),
        amount: Number(amount),
        category: "THR",
        date,
      },
    });
  }

  function addExpense({ category, amount, date }) {
    dispatch({
      type: ACTIONS.ADD_EXPENSE,
      payload: {
        id: `${Date.now()}-expense`,
        type: "expense",
        from: "Pengeluaran",
        amount: Number(amount),
        category,
        date,
      },
    });
  }

  function deleteTransaction(id) {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  }

  return {
    transactions,
    ...summary,
    addIncome,
    addExpense,
    deleteTransaction,
  };
}
