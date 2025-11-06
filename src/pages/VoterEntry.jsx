import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';

const VoterEntry = () => {
  const navigate = useNavigate();
  const { updateVoteData } = useVote();
  const [name, setName] = useState('');
  const [erpNumber, setErpNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const erpPattern = /^VGU\d{5,6}$/i;
  const isValidErp = erpPattern.test(erpNumber);
  const isFormValid = name.trim() && isValidErp;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: dbError } = await supabase
        .from('votes')
        .select('erp_number')
        .eq('erp_number', erpNumber.toUpperCase())
        .single();

      if (dbError && dbError.code !== 'PGRST116') {
        throw dbError;
      }

      if (data) {
        setError('You have already voted with this ERP number.');
        setLoading(false);
        return;
      }

      updateVoteData('name', name.trim());
      updateVoteData('erp_number', erpNumber.toUpperCase());
      navigate('/vote/president');
    } catch (err) {
      console.error('Error checking ERP:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <Header />

      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Card */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            border: '1px solid #E5E5E5',
            overflow: 'hidden'
          }}>
            {/* Header Section */}
            <div style={{
              padding: '32px 32px 24px',
              borderBottom: '1px solid #EBEBEB'
            }}>
              <h1 style={{
                fontSize: '26px',
                fontWeight: '600',
                color: '#222222',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                Welcome to VGU Elections
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#717171',
                lineHeight: '1.5',
                margin: 0
              }}>
                Please enter your details to begin voting
              </p>
            </div>

            {/* Form Content */}
            <div style={{ padding: '32px' }}>
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#222222',
                      marginBottom: '8px'
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
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
                      e.target.style.borderColor = '#222222';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34,34,34,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#B0B0B0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* ERP Input */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="erp"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#222222',
                      marginBottom: '8px'
                    }}
                  >
                    ERP Number
                  </label>
                  <input
                    type="text"
                    id="erp"
                    value={erpNumber}
                    onChange={(e) => setErpNumber(e.target.value.toUpperCase())}
                    placeholder="VGU12345"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: erpNumber && !isValidErp ? '1px solid #C13515' : '1px solid #B0B0B0',
                      outline: 'none',
                      background: 'white',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!erpNumber || isValidErp) {
                        e.target.style.borderColor = '#222222';
                        e.target.style.boxShadow = '0 0 0 2px rgba(34,34,34,0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!erpNumber || isValidErp) {
                        e.target.style.borderColor = '#B0B0B0';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {erpNumber && !isValidErp && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#C13515',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <AlertCircle size={14} />
                      Must be VGU followed by 5-6 digits (e.g., VGU12345)
                    </motion.p>
                  )}
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
                    background: isFormValid && !loading ? '#222222' : '#DDDDDD',
                    color: isFormValid && !loading ? 'white' : '#999999',
                    cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    if (isFormValid && !loading) {
                      e.target.style.background = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid && !loading) {
                      e.target.style.background = '#222222';
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
                      Checking...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Info */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: '#F7F7F7',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{
                  margin: 0,
                  color: '#717171',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  One vote per student • Your vote is confidential
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            color: '#717171',
            fontSize: '14px'
          }}>
            <p style={{ margin: 0 }}>
              By continuing, you agree to participate in the VGU Student Council Elections 2025
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterEntry;
