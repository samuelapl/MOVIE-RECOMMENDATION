import { motion } from "framer-motion";
import { FaFilm, FaInstagram, FaYoutube, FaImdb } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { SiTelegram, SiTiktok } from 'react-icons/si';

const Footer = () => {
  const socialLinks = [
    { icon: <FaYoutube />, label: "YouTube", gradient: "from-red-600 to-red-500" },
    { icon: <SiTelegram />, label: "Telegram", gradient: "from-blue-400 to-blue-500" },
    { icon: <SiTiktok />, label: "TikTok", gradient: "from-black to-gray-700" },
    { icon: <FaInstagram />, label: "Instagram", gradient: "from-pink-500 to-purple-500" },
  ];
  
  const quickLinks = [
    "Popular Movies", "New Releases", "Top Rated", 
    "Coming Soon", "Genres", "Collections"
  ];

  const legalLinks = [
    "Terms of Service", "Privacy Policy", "Cookie Policy"
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          
          {/* Brand Column - Always shown */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 col-span-2 md:col-span-1"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                <FaFilm className="text-white text-xl" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Roha Picks
                </span>
                <p className="text-xs text-slate-400 -mt-1">Movie Platform</p>
              </div>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              Your personal movie guide bringing you the best films from around the world.
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#"
                  className={`w-10 h-10 bg-gradient-to-r ${social.gradient} rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Hidden on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 hidden lg:block"
          >
            <h3 className="text-xl font-bold text-white relative">
              Explore
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-slate-300 hover:text-purple-400 transition-colors flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal - Hidden on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 hidden lg:block"
          >
            <h3 className="text-xl font-bold text-white relative">
              Legal
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-slate-300 hover:text-purple-400 transition-colors flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Always shown */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6 col-span-2 md:col-span-1"
          >
            <h3 className="text-xl font-bold text-white relative">
              Contact Us
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <MdLocationOn className="text-purple-400" />
                </div>
                <span className="text-slate-300">Ethiopia</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                  <MdEmail className="text-purple-400" />
                </div>
                <span className="text-slate-300">samuelapl193@gmail.com</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                  <MdPhone className="text-purple-400" />
                </div>
                <span className="text-slate-300">+251960319141</span>
              </li>
              <li className="flex items-center pt-4 border-t border-slate-700/50">
                <FaImdb className="text-3xl text-yellow-400 mr-3" />
                <span className="text-slate-400 text-sm">Data provided by IMDb API</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-12"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm"
        >
          <div className="mb-4 md:mb-0">
            © 2024 Roha Picks. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-purple-400 transition-colors">FAQ</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;