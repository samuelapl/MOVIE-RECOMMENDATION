import React from 'react';
import { motion } from "framer-motion";
import { FaUserPlus, FaStar, FaFilm } from "react-icons/fa";

const WhatYouGetSteps = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Cinematic theater background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-yellow-400">3-Step</span> Movie Magic
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From signup to perfect recommendations in minutes
          </p>
        </motion.div>
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gray-700/50 z-0"></div>
          
          {[
            {
              step: "1",
              icon: <FaUserPlus className="text-3xl text-yellow-400" />,
              title: "Create Profile",
              description: "Tell us your favorite genres, actors, and directors"
            },
            {
              step: "2",
              icon: <FaStar className="text-3xl text-yellow-400" />,
              title: "Smart Matching",
              description: "We analyze your preferences against our database"
            },
            {
              step: "3",
              icon: <FaFilm className="text-3xl text-yellow-400" />,
              title: "Perfect Picks For You",
              description: "Receive curated selections tailored to your taste"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl text-center z-10 border border-gray-700/50 hover:border-yellow-400 transition-all"
            >
              {/* Number and Icon Container */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900 border-2 border-yellow-400 text-2xl font-bold text-yellow-400 mb-4">
                  {item.step}
                </div>
                <div className="p-3 rounded-full bg-gray-900/50">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatYouGetSteps