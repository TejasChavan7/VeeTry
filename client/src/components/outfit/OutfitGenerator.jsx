import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { motion } from 'framer-motion';

import OutfitDisplay from "./OutfitDisplay.jsx";


const options = {
  genders: ['Male', 'Female', 'Other'],
  occupations: ['Office', 'Casual', 'Sporty', 'Custom'],
  events: ['Wedding', 'Party', 'Meeting', 'Custom'],
};

export default function OutfitGenerator() {
  const [form, setForm] = useState({
    gender: 'Male',
    age: '',
    occupation: 'Office',
    event: 'Meeting',
    customOccupation: '',
    customEvent: ''
  });

  const [outfit, setOutfit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted');
    setIsLoading(true);
    
    const payload = {
      gender: form.gender,
      age: form.age,
      occupation: form.occupation === 'Custom' ? form.customOccupation : form.occupation,
      event: form.event === 'Custom' ? form.customEvent : form.event,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/outfit/generate', payload);
      console.log('Response:', res.data);
      setOutfit(res.data);
      setFormVisible(false);
    } catch (error) {
      console.error("Error fetching outfit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormVisible(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,  
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.97 
    }
  };

  return (
    <div className="max-w-md mx-auto relative">
      {formVisible ? (
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-80 border border-gray-100"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-20 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full opacity-20 blur-md"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent animate-hue"
            variants={itemVariants}
          >
            Design Your Perfect Look
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="relative">
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange} 
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none"
                >
                  {options.genders.map(g => <option key={g}>{g}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
  <input
    type="number"
    name="age"
    value={form.age}
    onChange={handleChange}
    min="1"
    max="100"
    className="mt-1 w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
    placeholder="Enter your age (1–100)"
  />
</motion.div>

            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
              <div className="relative">
                <select
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none"
                >
                  {options.occupations.map(o => <option key={o}>{o}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {form.occupation === 'Custom' && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  name="customOccupation"
                  placeholder="Enter custom occasion"
                  value={form.customOccupation}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
              <div className="relative">
                <select
                  name="event"
                  value={form.event}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none"
                >
                  {options.events.map(e => <option key={e}>{e}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {form.event === 'Custom' && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  name="customEvent"
                  placeholder="Enter custom event"
                  value={form.customEvent}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </motion.div>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold shadow-lg transform transition-all duration-200 animate-pulse-shadow relative overflow-hidden"
            >
              <motion.span 
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0.3 }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Magic...
                </div>
              ) : (
                <span className="relative z-10">Create Your Dream Outfit</span>
              )}
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <OutfitDisplay outfit={outfit} />
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={resetForm}
            className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg transition-all duration-200 flex items-center justify-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Generate Another Outfit
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}