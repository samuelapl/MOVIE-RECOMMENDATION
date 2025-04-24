import { motion } from "framer-motion";
import { FaFilm, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaImdb } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center mb-4">
              <FaFilm className="text-3xl text-yellow-400 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Bruh Picks
              </span>
            </div>
            <p className="text-gray-400 mb-4">
            Your personal movie guide bringing you the best films            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, label: "Facebook" },
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaYoutube />, label: "YouTube" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 text-xl transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-yellow-400 pb-2 inline-block">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                "Popular Movies",
                "New Releases",
                "Top Rated",
                "Coming Soon",
                "Genres",
                "Collections"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-yellow-400 pb-2 inline-block">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-yellow-400 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdLocationOn className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Ethiopia</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="text-yellow-400 mr-3" />
                <span className="text-gray-400">samuelapl193@gmail.com</span>
              </li>
              <li className="flex items-center">
                <MdPhone className="text-yellow-400 mr-3" />
                <span className="text-gray-400">+251960319141</span>
              </li>
              <li className="flex items-center mt-6">
                <FaImdb className="text-3xl text-yellow-400 mr-3" />
                <span className="text-gray-400 text-sm">Data provided by IMDb API</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 my-8"
        ></motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
        >
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Bruh Picks. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-yellow-400 transition-colors">FAQ</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;