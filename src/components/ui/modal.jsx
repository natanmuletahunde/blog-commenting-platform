'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Modal({ show, onClose, children, className }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center p-4',
              className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className='bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-md w-full p-6 relative'
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
