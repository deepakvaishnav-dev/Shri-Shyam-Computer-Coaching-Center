import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ToastContext = createContext(null);

const icons = {
  success: <CheckCircle size={18} className="text-[#2E7D32]" />,
  error: <XCircle size={18} className="text-[#C62828]" />,
  warning: <AlertTriangle size={18} className="text-[#F9A825]" />,
  info: <Info size={18} className="text-[#1A237E]" />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="toast-container no-print">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn('toast', `toast-${t.type}`, t.removing && 'removing')}
          >
            {icons[t.type]}
            <p className="flex-1 text-sm font-medium text-[#111827]">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#9CA3AF] hover:text-[#374151] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
