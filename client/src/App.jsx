import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileCard from './components/ProfileCard';
import LinkButton from './components/LinkButton';
import profilePic from './profile.jpeg';

const App = () => {
  const [links, setLinks] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  const profile = {
    name: "Rabeel Ahmed",
    avatar: profilePic,
    bio: "Full-Stack Engineer | Open Source Enthusiast | Building awesome things on the web."
  };

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // Toggle dark mode class on html tag
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Fetch links from backend
    const fetchLinks = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
        const res = await fetch(`${apiUrl}/api/links`);
        if (res.ok) {
          const data = await res.json();
          setLinks(data.length > 0 ? data : getStaticLinks());
        } else {
          setLinks(getStaticLinks());
        }
      } catch (error) {
        setLinks(getStaticLinks());
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const getStaticLinks = () => [
    { _id: '1', title: 'My Portfolio', url: 'https://example.com' },
    { _id: '2', title: 'GitHub', url: 'https://github.com' },
    { _id: '3', title: 'Twitter / X', url: 'https://twitter.com' },
    { _id: '4', title: 'LinkedIn', url: 'https://linkedin.com' }
  ];

  const handleLinkClick = async (id) => {
    try {
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      await fetch(`${apiUrl}/api/links/click/${id}`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Failed to track click', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 p-3 rounded-full bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all duration-300 z-50 shadow-sm hover:shadow-md"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="max-w-lg mx-auto w-full relative z-10">
        <ProfileCard profile={profile} />

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col w-full mt-12 mb-20"
          >
            {/* The Tree Trunk */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-[-50px] w-2 bg-gradient-to-b from-emerald-600/80 via-emerald-400/80 to-transparent transform sm:-translate-x-1/2 rounded-full z-0 shadow-[0_0_15px_rgba(52,211,153,0.5)] dark:shadow-[0_0_15px_rgba(52,211,153,0.3)]"></div>

            {links.map((link, index) => (
              <motion.div key={link._id} variants={itemVariants} className="w-full relative z-10 my-4 sm:my-6">
                <LinkButton link={link} index={index} onClick={handleLinkClick} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Decorative nature background blobs - Glassmorphism style */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-emerald-300/20 to-teal-300/20 dark:from-emerald-900/30 dark:to-teal-900/30 blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-green-300/20 to-emerald-300/20 dark:from-green-900/30 dark:to-emerald-900/30 blur-[100px] animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default App;
