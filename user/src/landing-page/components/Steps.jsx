import React from 'react';
import { motion } from "framer-motion";
import { FaUserPlus, FaStar, FaFilm } from "react-icons/fa";

const Steps = () => {
  const steps = [
    {
      step: "1",
      icon: <FaUserPlus className="text-3xl" />,
      title: "Create Profile",
      description: "Tell us your favorite genres",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      step: "2",
      icon: <FaStar className="text-3xl" />,
      title: "Smart Matching",
      description: "We analyze your preferences against our database",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      step: "3",
      icon: <FaFilm className="text-3xl" />,
      title: "Perfect Picks For You",
      description: "Receive chosen selections tailored to your taste",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              3-Step
            </span>{" "}
            <span className="text-white">Movie Magic</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From signup to perfect recommendations in minutes
          </p>
        </motion.div>
    
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-32 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 text-center transition-all duration-500 group-hover:border-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Step Number */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {item.step}
                        </div>
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Step Connector for Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-8 mb-8">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
