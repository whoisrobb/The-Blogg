// useAuth.js
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuth(false);
  };

  return { auth, logout };
};

export default useAuth;