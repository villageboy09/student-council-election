import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, LogIn, Shield } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
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
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '420px'
        }}
      >
        {/* Main Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          {/* Header Section */}
          <div style={{
            padding: '40px 32px 32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                marginBottom: '20px'
              }}
            >
              <Shield size={32} color="white" />
            </motion.div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              Admin Login
            </h1>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.8)',
              margin: 0
            }}>
              Access the voting control panel
            </p>
          </div>

          {/* Form Content */}
          <div style={{ padding: '32px' }}>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#222222',
                    marginBottom: '8px'
                  }}
                >
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vgu.ac.in"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #B0B0B0',
                    outline: 'none',
                    background: 'white',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#B0B0B0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#222222',
                    marginBottom: '8px'
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #B0B0B0',
                    outline: 'none',
                    background: 'white',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#B0B0B0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginBottom: '24px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: '#FFF4F1',
                    border: '1px solid #F0D9D4',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <AlertCircle size={18} color="#C13515" />
                  <span style={{ color: '#C13515', fontSize: '14px', fontWeight: '500' }}>{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  background: isFormValid && !loading ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#DDDDDD',
                  color: isFormValid && !loading ? 'white' : '#999999',
                  cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  boxShadow: isFormValid && !loading ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (isFormValid && !loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isFormValid && !loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '13px'
        }}>
          <p style={{ margin: 0 }}>
            VGU Student Council Election 2025 - Admin Panel
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
