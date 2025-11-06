import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Header />

      {/* Floating particles effect */}
      <div style={{ position: 'relative' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              left: `${20 + i * 15}%`,
              top: '50px',
            }}
          />
        ))}
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Card with Glassmorphism */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            overflow: 'hidden'
          }}>
            {/* Header with Gradient */}
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '40px 30px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                }}
              />

              <Sparkles className="inline-block mb-3" size={40} color="white" />
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '10px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}>
                🎓 VGU Student Council Elections 2025
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: '500'
              }}>
                Your Voice, Your Choice! Let's Make a Difference
              </p>
            </div>

            {/* Form Content */}
            <div style={{ padding: '40px 30px' }}>
              <form onSubmit={handleSubmit}>
                {/* Name Input with Modern Style */}
                <div style={{ marginBottom: '25px' }}>
                  <Label
                    htmlFor="name"
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#4a5568',
                      marginBottom: '8px',
                      display: 'block'
                    }}
                  >
                    📝 Full Name <span style={{ color: '#f56565' }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '16px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      transition: 'all 0.3s',
                      outline: 'none',
                      background: '#f7fafc'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* ERP Input with Modern Style */}
                <div style={{ marginBottom: '25px' }}>
                  <Label
                    htmlFor="erp"
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#4a5568',
                      marginBottom: '8px',
                      display: 'block'
                    }}
                  >
                    🎫 ERP Number <span style={{ color: '#f56565' }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    id="erp"
                    value={erpNumber}
                    onChange={(e) => setErpNumber(e.target.value.toUpperCase())}
                    placeholder="VGU12345"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '16px',
                      borderRadius: '12px',
                      border: erpNumber && !isValidErp ? '2px solid #f56565' : '2px solid #e2e8f0',
                      transition: 'all 0.3s',
                      outline: 'none',
                      background: '#f7fafc'
                    }}
                    onFocus={(e) => {
                      if (!erpNumber || isValidErp) {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!erpNumber || isValidErp) {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {erpNumber && !isValidErp && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#f56565',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <AlertCircle size={16} />
                      Invalid format. Must be VGU followed by 5-6 digits (e.g., VGU12345)
                    </motion.p>
                  )}
                </div>

                {/* Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      marginBottom: '20px',
                      padding: '16px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                      border: '2px solid #f87171',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <AlertCircle size={20} color="#dc2626" />
                    <span style={{ color: '#dc2626', fontWeight: '500' }}>{error}</span>
                  </motion.div>
                )}

                {/* Submit Button with Gradient */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid || loading}
                  whileHover={isFormValid && !loading ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%',
                    padding: '18px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderRadius: '14px',
                    border: 'none',
                    background: isFormValid && !loading
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#cbd5e0',
                    color: 'white',
                    cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: isFormValid && !loading
                      ? '0 10px 25px rgba(102, 126, 234, 0.4)'
                      : 'none',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
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
                      Checking...
                    </>
                  ) : (
                    <>
                      🚀 Proceed to Vote
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Footer with Icon */}
              <div style={{
                marginTop: '30px',
                padding: '20px',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                border: '2px solid #93c5fd'
              }}>
                <CheckCircle2 size={20} color="#0284c7" />
                <p style={{ margin: 0, color: '#0369a1', fontWeight: '500', fontSize: '14px' }}>
                  One vote per student • Your vote is confidential
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterEntry;
