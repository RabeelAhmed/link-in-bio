import React from 'react';
import { motion } from 'framer-motion';

const LinkButton = ({ link, onClick }) => {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onClick(link._id)}
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center justify-center w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-sm border border-slate-200/50 dark:border-slate-700/50 text-center font-semibold text-slate-800 dark:text-slate-100 hover:shadow-xl hover:border-purple-500/30 dark:hover:border-purple-400/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
    >
      {link.title}
    </motion.a>
  );
};

export default LinkButton;
