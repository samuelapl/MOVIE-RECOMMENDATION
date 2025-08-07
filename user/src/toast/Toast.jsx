// src/toast/Toast.jsx
import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ toast, onRemove }) => {
  // Automatically remove the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [toast.id, onRemove]);

  // Determine icon and background color based on toast type
  let icon, color;
  switch (toast.type) {
    case 'success':
      icon = <FaCheckCircle />;
      color = 'bg-green-500';
      break;
    case 'error':
      icon = <FaTimesCircle />;
      color = 'bg-red-500';
      break;
    default:
      icon = <FaInfoCircle />;
      color = 'bg-blue-500';
  }

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-xl text-white transform transition-transform duration-300 ease-out-back ${color} mb-3`}
      // The inline style helps with initial rendering animation if needed
      style={{ transform: 'translateX(0)', opacity: 1 }}
    >
      {icon}
      <span className="ml-3 font-semibold">{toast.message}</span>
      {/* Close button for manual dismissal */}
      <button onClick={() => onRemove(toast.id)} className="ml-auto text-white opacity-75 hover:opacity-100">
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;