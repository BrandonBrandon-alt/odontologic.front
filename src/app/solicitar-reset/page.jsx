"use client";
import React from "react";
import { motion } from "framer-motion";
import RequestPasswordResetForm from "@/components/Form/RequestPasswordResetForm";

const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function SolicitarResetPage() {
  return (
    <motion.div
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <RequestPasswordResetForm />
    </motion.div>
  );
}
