'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import useDarkMode from '../../hooks/useDarkMode';

const ThemeToggleButton = () => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    return (
        <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="fixed top-4 right-4 p-3 rounded-full bg-surface shadow-dental-md border border-border text-text-primary"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle dark mode"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDarkMode ? "moon" : "sun"}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                >
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggleButton;
