"use client";
import ActivateAccountForm from "@/components/Form/ActivateAccountForm";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ActivateAccountPage() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <ActivateAccountForm />
    </motion.div>
  );
}
