import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

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
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;