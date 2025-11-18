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
      setError(result.error || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8B2635 0%, #5C1A1B 100%)',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Blobs */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-20%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <img
            src={vguLogo}
            alt="VGU Logo"
            style={{
              height: '90px',
              width: 'auto',
              background: 'white',
              padding: '16px',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          />
        </motion.div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '40px 40px 28px',
            textAlign: 'center',
            borderBottom: '1px solid #f0f0f0'
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
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #8B2635 0%, #5C1A1B 100%)',
                marginBottom: '20px',
                boxShadow: '0 10px 30px rgba(139, 38, 53, 0.5)'
              }}
            >
              <Lock size={34} color="white" />
            </motion.div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px' }}>
              Admin Portal
            </h1>
            <p style={{ fontSize: '15px', color: '#666666', margin: 0 }}>
              Sign in to access the voting control panel
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: '40px' }}>
            <form onSubmit={handleSubmit}>
              {/* Email Field - FULLY FIXED */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} color="#888" style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    zIndex: 10
                  }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vgu.ac.in"
                    autoComplete="username"
                    required
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 52px',
                      fontSize: '15px',
                      borderRadius: '14px',
                      border: '2px solid #e0e0e0',
                      background: email ? 'white' : '#fafafa',  // Key fix: white bg when typing
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                      // Fix ugly autofill styles
                      WebkitBoxShadow: email ? '0 0 0px 1000px white inset' : 'none',
                      WebkitTextFillColor: '#000',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8B2635';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 5px rgba(139, 38, 53, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.background = email ? 'white' : '#fafafa';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} color="#888" style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    zIndex: 10
                  }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 52px',
                      fontSize: '15px',
                      borderRadius: '14px',
                      border: '2px solid #e0e0e0',
                      background: '#fafafa',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8B2635';
                      e.target.style.background = 'white';
                      e.target.style.boxShadow = '0 0 0 5px rgba(139, 38, 53, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.background = '#fafafa';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginBottom: '24px',
                    padding: '16px',
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <AlertCircle size={20} color="#DC2626" />
                  <span style={{ color: '#DC2626', fontSize: '14px', fontWeight: '500' }}>{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '14px',
                  border: 'none',
                  background: isFormValid && !loading 
                    ? 'linear-gradient(135deg, #8B2635 0%, #5C1A1B 100%)' 
                    : '#e0e0e0',
                  color: isFormValid && !loading ? 'white' : '#999',
                  cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: isFormValid && !loading ? '0 10px 30px rgba(139, 38, 53, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => isFormValid && !loading && (e.target.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => isFormValid && !loading && (e.target.style.transform = 'translateY(0)')}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={22} />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '32px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0, fontWeight: '600' }}>
            VGU Student Council Election 2025
          </p>
          <p style={{ margin: '6px 0 0', fontSize: '13px', opacity: 0.9 }}>
            Secure Admin Portal • Restricted Access
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;