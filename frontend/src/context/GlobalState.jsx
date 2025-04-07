import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

const initialState = {
  transactions: [],
  loading: true,
  error: null,
};

export const GlobalContext = createContext(initialState);

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t._id !== action.payload),
      };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Get transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get(API_URL);
      dispatch({ type: 'GET_TRANSACTIONS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response?.data || 'Error' });
    }
  };

  // Add transaction
  const addTransaction = async (tx) => {
    try {
      const res = await axios.post(API_URL, tx);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response?.data || 'Error' });
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response?.data || 'Error' });
    }
  };
  

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
