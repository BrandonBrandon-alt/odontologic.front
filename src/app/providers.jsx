"use client";

import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "@/components/ui/ToastProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider position="top-right" max={5}>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
