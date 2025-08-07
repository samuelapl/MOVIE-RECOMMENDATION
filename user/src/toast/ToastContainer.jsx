// src/toast/ToastContainer.jsx
import React from 'react';
import Toast from './Toast.jsx'; // Import the individual Toast component

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;