import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, ChevronLeft, User, IdCard } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { supabase } from '../lib/supabaseClient';
import { positionLabels } from '../data/candidates';
import Header from '../components/Header';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { voteData, setIsSubmitted } = useVote();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if no voter data or incomplete selections
    if (
      !voteData.name ||
      !voteData.erp_number ||
      !voteData.president ||
      !voteData.vice_president ||
      !voteData.secretary ||
      !voteData.treasurer ||
      !voteData.management_head
    ) {
      navigate('/');
    }
  }, [voteData, navigate]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Submit vote to Supabase
      const { error: insertError } = await supabase.from('votes').insert([
        {
          name: voteData.name,
          erp_number: voteData.erp_number,
          president: voteData.president,
          vice_president: voteData.vice_president,
          secretary: voteData.secretary,
          treasurer: voteData.treasurer,
          management_head: voteData.management_head,
        },
      ]);

      if (insertError) {
        if (insertError.code === '23505') {
          // Unique constraint violation
          setError('Vote already submitted with this ERP number.');
        } else {
          throw insertError;
        }
        setLoading(false);
        return;
      }

      // Mark as submitted and navigate to thank you page
      setIsSubmitted(true);
      navigate('/thank-you');
    } catch (err) {
      console.error('Error submitting vote:', err);
      setError('An error occurred while submitting your vote. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/vote/management_head');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <Header />

      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '40px 20px 80px'
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
                Review your vote
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#717171',
                lineHeight: '1.5',
                margin: 0
              }}>
                Please verify your selections before submitting
              </p>
            </div>

            {/* Content */}
            <div style={{ padding: '32px' }}>
              {/* Voter Info */}
              <div style={{
                marginBottom: '32px',
                padding: '20px',
                background: '#F7F7F7',
                borderRadius: '8px',
                border: '1px solid #EBEBEB'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#222222',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Voter Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <User size={18} color="#717171" />
                    <span style={{ fontSize: '15px', color: '#717171' }}>Name:</span>
                    <span style={{ fontSize: '15px', color: '#222222', fontWeight: '500' }}>{voteData.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <IdCard size={18} color="#717171" />
                    <span style={{ fontSize: '15px', color: '#717171' }}>ERP:</span>
                    <span style={{ fontSize: '15px', color: '#222222', fontWeight: '500' }}>{voteData.erp_number}</span>
                  </div>
                </div>
              </div>

              {/* Selected Candidates */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#222222',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Your Selections
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(positionLabels).map(([key, label]) => (
                    <div
                      key={key}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #EBEBEB',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <span style={{
                        fontSize: '15px',
                        color: '#717171',
                        flex: '0 0 auto'
                      }}>
                        {label}
                      </span>
                      <span style={{
                        fontSize: '15px',
                        color: '#222222',
                        fontWeight: '600',
                        textAlign: 'right'
                      }}>
                        {voteData[key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div style={{
                marginBottom: '32px',
                padding: '16px',
                background: '#FFF9E6',
                border: '1px solid #F5E6C3',
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <AlertTriangle size={20} color="#B8860B" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6B5B00',
                  lineHeight: '1.5'
                }}>
                  Once submitted, your vote cannot be changed. Please review carefully before confirming.
                </p>
              </div>

              {/* Error Message */}
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

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleBack}
                  disabled={loading}
                  style={{
                    flex: '1',
                    minWidth: '140px',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: '1px solid #222222',
                    background: 'white',
                    color: '#222222',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    opacity: loading ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.background = '#F7F7F7';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.background = 'white';
                    }
                  }}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    flex: '2',
                    minWidth: '180px',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    background: loading ? '#DDDDDD' : '#222222',
                    color: loading ? '#999999' : 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.background = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
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
                      Submitting...
                    </>
                  ) : (
                    'Confirm & Submit Vote'
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
