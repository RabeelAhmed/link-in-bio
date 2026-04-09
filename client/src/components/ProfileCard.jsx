import React from 'react';
import { motion } from 'framer-motion';

const ProfileCard = ({ profile }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center mb-8 relative z-10"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full blur-lg animate-pulse opacity-80"></div>
        <img 
          src={profile.avatar} 
          alt={profile.name} 
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-2xl border-[4px] border-emerald-100 dark:border-slate-800 object-cover mb-4 z-10 transform hover:scale-105 hover:rotate-3 transition-transform duration-500"
        />
        {/* Tree Top Decoration */}
        <div className="absolute -top-4 -right-2 text-2xl animate-bounce shadow-emerald-400/50 drop-shadow-md z-20">🍃</div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-900 to-teal-700 dark:from-emerald-300 dark:to-teal-100 mt-2">
        {profile.name}
      </h1>
      <p className="text-emerald-800/80 dark:text-emerald-100/70 text-center mt-3 max-w-md text-sm sm:text-base font-medium leading-relaxed bg-white/30 dark:bg-slate-900/40 backdrop-blur-sm p-3 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm">
        {profile.bio}
      </p>
    </motion.div>
  );
};

export default ProfileCard;
