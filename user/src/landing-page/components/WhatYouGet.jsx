import { motion } from "framer-motion";
import { FaFilm, FaInfoCircle, FaTheaterMasks, FaPlay, FaStar, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhatYouGet = () => {
  const features = [
    {
      icon: <FaFilm className="text-4xl" />,
      title: "New Movies",
      description: "Watch brand new movies first with our always-updated collection",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaInfoCircle className="text-4xl" />,
      title: "Movie Details",
      description: "See extra content and details about the movies",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaTheaterMasks className="text-4xl" />,
      title: "For Everyone",
      description: "Find cartoons for kids and classic films for adults - sorted by age",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon:  <FaPlay className="text-4xl" />,
      title: "Watch Trailers",
      description: "Watch online on any device",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Smart Picks",
      description: "We suggests movies you'll like based on what your prefrences",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaCalendarAlt className="text-4xl" />,
      title: "Coming Soon",
      description: "Know when new movies arrive with our movie schedule",
      gradient: "from-indigo-500 to-purple-500"
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
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Ultimate{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Movie Experience
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Here's what you'll find inside - get full access with your free account!
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {/* Icon Container */}
                  <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-30 animate-pulse" />
            <Link  to="/signup">
            <button className="relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full text-xl transition-all duration-300 shadow-2xl shadow-purple-500/25 hover:scale-105 hover:shadow-purple-500/40">
              Unlock These Features — Sign Up
            </button>
            </Link>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouGet;
