'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPrivateRoute = ({ children }) => {
  const router = useRouter();
  const checkAuthentication = async () => {
    const isAuthenticated = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!isAuthenticated || role !== "Admin") {
      router.push('/');
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  return children;
};

export default AdminPrivateRoute;
