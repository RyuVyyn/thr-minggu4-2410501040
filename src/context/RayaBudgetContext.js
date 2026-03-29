import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@raya_budget_transactions";

const initialState = {
  transactions: [],
};

export const ACTIONS = {
  LOAD_DATA: "LOAD_DATA",
  ADD_INCOME: "ADD_INCOME",
  ADD_EXPENSE: "ADD_EXPENSE",
  DELETE_TRANSACTION: "DELETE_TRANSACTION",
};

const RayaBudgetContext = createContext(null);

function rayaBudgetReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_DATA:
      return { ...state, transactions: action.payload || [] };
    case ACTIONS.ADD_INCOME:
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case ACTIONS.ADD_EXPENSE:
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export function RayaBudgetProvider({ children }) {
  const [state, dispatch] = useReducer(rayaBudgetReducer, initialState);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          dispatch({ type: ACTIONS.LOAD_DATA, payload: JSON.parse(raw) });
        }
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    }

    loadTransactions();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions)).catch((error) => {
      console.error("Failed to save transactions:", error);
    });
  }, [state.transactions]);

  const value = useMemo(
    () => ({
      transactions: state.transactions,
      dispatch,
    }),
    [state.transactions],
  );

  return <RayaBudgetContext.Provider value={value}>{children}</RayaBudgetContext.Provider>;
}

export function useRayaBudgetContext() {
  const context = useContext(RayaBudgetContext);
  if (!context) {
    throw new Error("useRayaBudgetContext must be used inside RayaBudgetProvider");
  }
  return context;
}
