import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTooth } from "react-icons/fa";

const Logo = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Link
      href="/"
      className="group relative flex items-center space-x-3 text-2xl font-bold transition-all duration-300"
    >
      <motion.div
        className="relative"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
          <FaTooth className="text-white text-lg" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl opacity-30 group-hover:animate-ping"></div>
      </motion.div>
      <span className="hidden sm:inline bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent font-extrabold tracking-tight">
        Odontologic
      </span>
    </Link>
  </motion.div>
);

export default React.memo(Logo);
