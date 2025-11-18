import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Vote, Shield, User } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Header from '../components/Header';

const VotePanel = () => {
  const navigate = useNavigate();
  const { admin, isAuthenticated, logout } = useAdmin();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleStartVoting = () => {
    navigate('/');
  };

  if (!admin) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <Header />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Admin Info Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Shield size={24} color="white" />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0
                  }}>
                    Admin Panel
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    margin: 0
                  }}>
                    {admin.name || admin.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '2px solid rgba(255,255,255,0.5)',
                  background: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '32px',
              borderBottom: '1px solid #EBEBEB',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#222222',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                Voting Control Panel
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#717171',
                margin: 0
              }}>
                Manage and control the voting session
              </p>
            </div>

            {/* Actions */}
            <div style={{ padding: '32px' }}>
              {/* Start Voting Section */}
              <div style={{
                padding: '24px',
                background: '#F7F7F7',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <Vote size={24} color="#667eea" />
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#222222',
                    margin: 0
                  }}>
                    Open Voting Session
                  </h3>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#717171',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  Click the button below to open the voting page. Students can then enter their ERP number to cast their vote.
                </p>
                <button
                  onClick={handleStartVoting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  <Vote size={20} />
                  Open Voting Page
                </button>
              </div>

              {/* Info Section */}
              <div style={{
                padding: '20px',
                background: '#E8F4FD',
                borderRadius: '8px',
                border: '1px solid #B8DAFF'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#004085',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <User size={16} />
                  Voting Process
                </h4>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  color: '#004085',
                  fontSize: '14px',
                  lineHeight: '1.8'
                }}>
                  <li>Students enter their ERP number to start voting</li>
                  <li>Each ERP can only vote once</li>
                  <li>Votes are recorded securely in the database</li>
                  <li>Results can be viewed after voting ends</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VotePanel;
