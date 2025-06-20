'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const checkAuthentication = async () => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      router.push('/');
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  return children;
};

export default PrivateRoute;
