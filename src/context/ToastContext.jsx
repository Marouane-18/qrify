import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, message, type = 'info', duration = 3500 }) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      const newToast = { id, title, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toast = {
    success: (message, title = '') => addToast({ type: 'success', title, message }),
    error: (message, title = '') => addToast({ type: 'error', title, message }),
    info: (message, title = '') => addToast({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast Render Container with RTL support */}
      <div className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0 text-left rtl:text-right">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${
              t.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-800 text-emerald-100 shadow-emerald-950/30 dark:bg-emerald-950/90 dark:border-emerald-800'
                : t.type === 'error'
                ? 'bg-rose-950/90 border-rose-800 text-rose-100 shadow-rose-950/30 dark:bg-rose-950/90 dark:border-rose-800'
                : 'bg-zinc-900/90 border-zinc-700 text-zinc-100 shadow-zinc-950/40 dark:bg-zinc-900/95 dark:border-zinc-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-indigo-400" />}
            </div>

            <div className="flex-1 min-w-0">
              {t.title && <p className="text-xs font-semibold uppercase tracking-wider opacity-90">{t.title}</p>}
              <p className="text-sm font-medium leading-snug break-words">{t.message}</p>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}
