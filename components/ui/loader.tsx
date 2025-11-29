"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Loader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }[size];

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-solid border-primary-500 border-t-transparent",
        sizeClasses,
        className
      )}
    />
  );
}

export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-1/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader size="lg" />
        <p className="text-light-1 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export function ButtonLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-5 w-5 border-2 border-solid border-white border-t-transparent",
        className
      )}
    />
  );
}
