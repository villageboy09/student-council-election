import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const storedAdmin = sessionStorage.getItem('adminSession');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Query the admins table to verify credentials
      const { data, error } = await supabase
        .from('admins')
        .select('id, email, name')
        .eq('email', email.toLowerCase())
        .eq('password', password)
        .single();

      if (error || !data) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Store admin session
      const adminData = {
        id: data.id,
        email: data.email,
        name: data.name,
        loggedInAt: new Date().toISOString()
      };

      sessionStorage.setItem('adminSession', JSON.stringify(adminData));
      setAdmin(adminData);

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('adminSession');
    setAdmin(null);
  };

  const isAuthenticated = () => {
    return admin !== null;
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout, isAuthenticated }}>
      {children}
    </AdminContext.Provider>
  );
};
