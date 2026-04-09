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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur animate-pulse opacity-70"></div>
        <img 
          src={profile.avatar} 
          alt={profile.name} 
          className="relative w-28 h-28 rounded-full shadow-2xl border-4 border-white dark:border-slate-800 object-cover mb-4 z-10 transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
        {profile.name}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-center mt-3 max-w-md text-sm font-medium leading-relaxed">
        {profile.bio}
      </p>
    </motion.div>
  );
};

export default ProfileCard;
