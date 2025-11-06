import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, User, IdCard } from 'lucide-react';
import { useVote } from '../context/VoteContext';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const { isSubmitted, voteData } = useVote();

  useEffect(() => {
    // Redirect if vote wasn't submitted
    if (!isSubmitted) {
      navigate('/');
    }

    // Prevent back button navigation
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href);
    });

    // Auto-redirect to home page after 2 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [isSubmitted, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
          maxWidth: '540px'
        }}
      >
        {/* Main Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          border: '1px solid #E5E5E5',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          {/* Success Icon */}
          <div style={{
            padding: '48px 32px 32px',
            borderBottom: '1px solid #EBEBEB'
          }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#00A699',
                marginBottom: '24px'
              }}
            >
              <CheckCircle2 size={48} color="white" strokeWidth={2.5} />
            </motion.div>

            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#222222',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              Vote submitted successfully
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#717171',
              lineHeight: '1.5',
              margin: 0
            }}>
              Thank you for participating in the VGU Student Council Elections 2025
            </p>
          </div>

          {/* Voter Info */}
          <div style={{ padding: '32px' }}>
            <div style={{
              padding: '20px',
              background: '#F7F7F7',
              borderRadius: '8px',
              border: '1px solid #EBEBEB',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#717171',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Confirmation Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                  <User size={18} color="#717171" />
                  <span style={{ fontSize: '15px', color: '#222222', fontWeight: '500' }}>{voteData.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                  <IdCard size={18} color="#717171" />
                  <span style={{ fontSize: '15px', color: '#222222', fontWeight: '500' }}>{voteData.erp_number}</span>
                </div>
              </div>
            </div>

            {/* Info Notes */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                padding: '12px 16px',
                background: '#F7F7F7',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#717171',
                lineHeight: '1.5'
              }}>
                🔒 Your vote has been recorded and is confidential
              </div>
              <div style={{
                padding: '12px 16px',
                background: '#F7F7F7',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#717171',
                lineHeight: '1.5'
              }}>
                📊 Results will be announced soon
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#717171',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0 }}>
            Redirecting to home page in 2 seconds...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
