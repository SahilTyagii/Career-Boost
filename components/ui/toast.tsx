"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const TOAST_AUTO_DISMISS_DURATION = 4000;

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type = "info", isVisible, onClose }: ToastProps) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, TOAST_AUTO_DISMISS_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  }[type];

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white",
        "transform transition-all duration-300 ease-in-out",
        bgColor,
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// Toast context for global toast management
interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "warning" | "info") => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showToast = React.useCallback(
    (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
      setToast({ message, type, isVisible: true });
    },
    []
  );

  const hideToast = React.useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
