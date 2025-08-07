import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from './ToastContainer';
// Create the Toast Context
const ToastContext = createContext();

// Custom hook to easily use the toast functionality in any component
export const useToast = () => useContext(ToastContext);

// The Toast Provider component that wraps your application
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to add a new toast message
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now(); // Unique ID for each toast
    const newToast = { id, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []);

  // Function to remove a toast message by its ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* The ToastContainer will render all active toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};