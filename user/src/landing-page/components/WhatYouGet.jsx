import { motion } from "framer-motion";
import { FaFilm, FaInfoCircle, FaTheaterMasks, FaDownload, FaStar, FaCalendarAlt } from "react-icons/fa";

const WhatYouGet = () => {
  const features = [
    {
      icon: <FaFilm className="text-4xl text-yellow-400" />,
      title: "New Movies",
      description: "Watch brand new movies first with our always-updated collection",
      animation: { y: [-10, 0], opacity: [0, 1] }
    },
    {
      icon: <FaInfoCircle className="text-4xl text-yellow-400" />,
      title: "Movie Details",
      description: "See extra content like behind-the-scenes clips and actor info",
      animation: { y: [-10, 0], opacity: [0, 1], delay: 0.2 }
    },
    {
      icon: <FaTheaterMasks className="text-4xl text-yellow-400" />,
      title: "For Everyone",
      description: "Find cartoons for kids and classic films for adults - sorted by age",
      animation: { y: [-10, 0], opacity: [0, 1], delay: 0.4 }
    },
    {
      icon: <FaDownload className="text-4xl text-yellow-400" />,
      title: "Watch Offline",
      description: "Download movies or watch online on any device",
      animation: { y: [-10, 0], opacity: [0, 1], delay: 0.6 }
    },
    {
      icon: <FaStar className="text-4xl text-yellow-400" />,
      title: "Smart Picks",
      description: "Our system suggests movies you'll like based on what you watch",
      animation: { y: [-10, 0], opacity: [0, 1], delay: 0.8 }
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-yellow-400" />,
      title: "Coming Soon",
      description: "Know when new movies arrive with our movie schedule",
      animation: { y: [-10, 0], opacity: [0, 1], delay: 1 }
    }
];


  return (
    <section className="relative py-20 overflow-hidden">
    {/* Background Image with Gradient Overlay */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Movie theater seats with dramatic lighting"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
    </div>
  
    <div className="container mx-auto px-4 relative z-10">
      {/* Headline with Enhanced Styling */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          The Ultimate <br />
          <span className="text-yellow-400 bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Movie Experience
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Here's what you'll find inside - get full access with your free account!        </p>
      </motion.div>
  
      {/* Feature Grid with Glass Morphism Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-700/50 hover:border-yellow-400 transition-all hover:shadow-yellow-400/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 p-4 bg-gray-900/50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-lg">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
  
      {/* CTA with Enhanced Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="text-center mt-20"
      >
        <button className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold rounded-full text-lg transition-all shadow-lg hover:shadow-yellow-400/40 transform hover:-translate-y-1">
          Unlock These Features — Sign Up
        
        </button>
      </motion.div>
    </div>
  </section>
  );
};

export default WhatYouGet