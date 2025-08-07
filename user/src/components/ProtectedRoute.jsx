import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { motion } from 'framer-motion';
import { FaSpinner, FaShieldAlt } from 'react-icons/fa';

const ProtectedRoute = ({ children }) => {
  const { user, authLoading, verifyToken } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user && !authLoading) {
        setIsVerifying(true);
        await verifyToken();
        setIsVerifying(false);
      }
    };
    checkAuth();
  }, [user, authLoading, verifyToken]);

  if (authLoading || isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
          }} />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Loading Spinner */}
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
              <FaSpinner className="absolute inset-0 m-auto text-purple-500 text-3xl animate-pulse" />
            </div>
            
            {/* Loading Text */}
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Verifying Access
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Checking your authentication status...
            </p>
            
            {/* Loading Animation */}
            <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
