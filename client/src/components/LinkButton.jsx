import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const LinkButton = ({ link, index, onClick }) => {
  const isRight = index % 2 === 0;

  return (
    <div className={`relative flex w-full items-center sm:w-1/2 ${isRight ? 'sm:ml-auto sm:pr-4' : 'sm:mr-auto sm:pl-4 justify-end'}`}>
      
      {/* Mobile Branch */}
      <div className="w-8 sm:hidden h-1 bg-gradient-to-r from-emerald-600/80 to-emerald-400/80 ml-[36px] rounded-r-full shrink-0 z-0"></div>

      {/* Desktop Right Branch */}
      {isRight && (
        <div className="hidden sm:block w-12 lg:w-20 h-1.5 bg-gradient-to-r from-emerald-600/80 to-emerald-400/80 rounded-r-full shrink-0 z-0 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></div>
      )}

      {/* The Leaf */}
      <div className={`flex-grow pr-4 sm:pr-0 z-10 min-w-0 max-w-full ${isRight ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
        <motion.a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick(link._id)}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`group flex items-center justify-between w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 sm:p-5 shadow-lg border border-emerald-500/40 text-emerald-950 dark:text-emerald-50 text-base sm:text-lg font-bold hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] hover:border-emerald-400 dark:hover:border-emerald-400 transition-all duration-300 relative overflow-hidden ${
            isRight 
              ? 'rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md' 
              : 'rounded-tl-full rounded-br-full rounded-tr-md rounded-bl-md sm:rounded-tl-3xl sm:rounded-br-3xl sm:rounded-tr-md sm:rounded-bl-md'
          }`}
        >
          {/* Subtle leaf veins effect (decorative) */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #10b981 10px, #10b981 11px)' }}></div>
          
          <span className="truncate flex-grow mr-3 relative z-10" title={link.title}>{link.title}</span>
          <ExternalLink size={20} className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500 transition-all relative z-10" />
        </motion.a>
      </div>

      {/* Desktop Left Branch */}
      {!isRight && (
        <div className="hidden sm:block w-12 lg:w-20 h-1.5 bg-gradient-to-l from-emerald-600/80 to-emerald-400/80 rounded-l-full shrink-0 z-0 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></div>
      )}
    </div>
  );
};

export default LinkButton;
