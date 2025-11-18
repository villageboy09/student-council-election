import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, LogIn, Lock, Mail } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import vguLogo from '../assets/vgu.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/vote-panel');
    }
  }, [isAuthenticated, navigate]);

  const isFormValid = email.trim() && password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/vote-panel');
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-maroon-900 flex items-center justify-center px-4 py-12 relative overflow-hidden font-poppins">
      {/* Decorative Blobs */}
      <div className="absolute -top-48 -left-32 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -right-20 w-80 h-80 lg:w-[500px] lg:h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <img
            src={vguLogo}
            alt="VGU Logo"
            className="h-20 w-auto object-contain bg-white p-3 rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-gray-100">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-red-900 shadow-xl mb-4"
            >
              <Lock size={32} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
            <p className="text-gray-500 text-sm">Sign in to access the voting control panel</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vgu.ac.in"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-red-700 focus:outline-none focus:ring-4 focus:ring-red-700/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-red-700 focus:outline-none focus:ring-4 focus:ring-red-700/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-red-700">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={isFormValid && !loading ? { y: -2 } : {}}
                whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
                  isFormValid && !loading
                    ? 'bg-gradient-to-r from-red-700 to-red-900 hover:shadow-2xl cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In to Dashboard
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70">
          <p className="font-medium">VGU Student Council Election 2025</p>
          <p className="text-sm opacity-80 mt-1">Secure Admin Access • Powered by VGU IT</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;