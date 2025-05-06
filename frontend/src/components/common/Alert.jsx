import { useEffect } from 'react';

const Alert = ({ message, type = 'info', onClose, autoClose = true, autoCloseDuration = 5000 }) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, onClose]);

  const alertClasses = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`p-4 mb-4 rounded ${alertClasses[type]} flex justify-between items-center`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-lg font-semibold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;