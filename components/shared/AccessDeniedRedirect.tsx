"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";

interface AccessDeniedRedirectProps {
  message: string;
  redirectTo: string;
}

export default function AccessDeniedRedirect({ message, redirectTo }: AccessDeniedRedirectProps) {
  const router = useRouter();
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectTo);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, redirectTo]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-1">
      <Toast
        message={message}
        type="warning"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto mb-4" />
        <p className="text-light-1">Redirecting...</p>
      </div>
    </div>
  );
}
