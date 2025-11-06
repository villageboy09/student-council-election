import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { candidates, positionLabels } from '../data/candidates';
import Header from '../components/Header';

const SelectionPage = () => {
  const { position } = useParams();
  const navigate = useNavigate();
  const { voteData, updateVoteData } = useVote();
  const [selectedCandidate, setSelectedCandidate] = useState(
    voteData[position] || ''
  );

  const positionFlow = [
    'president',
    'vice_president',
    'secretary',
    'treasurer',
    'management_head',
  ];

  const currentIndex = positionFlow.indexOf(position);
  const isLastPosition = currentIndex === positionFlow.length - 1;

  useEffect(() => {
    if (!voteData.name || !voteData.erp_number) {
      navigate('/');
    }
  }, [voteData, navigate]);

  const handleNext = () => {
    if (!selectedCandidate) return;
    updateVoteData(position, selectedCandidate);
    if (isLastPosition) {
      navigate('/vote/confirm');
    } else {
      const nextPosition = positionFlow[currentIndex + 1];
      navigate(`/vote/${nextPosition}`);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevPosition = positionFlow[currentIndex - 1];
      navigate(`/vote/${prevPosition}`);
    } else {
      navigate('/');
    }
  };

  const positionCandidates = candidates[position] || [];
  const progress = ((currentIndex + 1) / positionFlow.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <Header />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px 80px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Progress Section */}
          <div style={{
            marginBottom: '32px',
            padding: '24px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            border: '1px solid #E5E5E5'
          }}>
            {/* Progress Bar */}
            <div style={{
              height: '6px',
              background: '#E5E5E5',
              borderRadius: '3px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: '#222222',
                  borderRadius: '3px'
                }}
              />
            </div>

            {/* Step Info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#222222'
              }}>
                Step {currentIndex + 1} of {positionFlow.length}
              </span>
              <span style={{
                fontSize: '14px',
                color: '#717171'
              }}>
                {Math.round(progress)}% complete
              </span>
            </div>
          </div>

          {/* Title Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#222222',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              Select {positionLabels[position]}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#717171',
              lineHeight: '1.5',
              margin: 0
            }}>
              Choose the candidate who will best represent you
            </p>
          </div>

          {/* Candidates Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {positionCandidates.map((candidate, idx) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                onClick={() => setSelectedCandidate(candidate.name)}
                style={{
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: selectedCandidate === candidate.name
                    ? '2px solid #222222'
                    : '1px solid #E5E5E5',
                  boxShadow: selectedCandidate === candidate.name
                    ? '0 4px 12px rgba(0,0,0,0.15)'
                    : '0 1px 3px rgba(0,0,0,0.12)',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}>
                  {/* Image */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover'
                      }}
                    />
                    {selectedCandidate === candidate.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '32px',
                          height: '32px',
                          background: '#222222',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                      >
                        <Check size={20} color="white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#222222',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}>
                      {candidate.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#717171',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {candidate.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '600px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleBack}
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#F7F7F7';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedCandidate}
              style={{
                flex: '2',
                minWidth: '180px',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                background: selectedCandidate ? '#222222' : '#DDDDDD',
                color: selectedCandidate ? 'white' : '#999999',
                cursor: selectedCandidate ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedCandidate) {
                  e.target.style.background = '#000000';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCandidate) {
                  e.target.style.background = '#222222';
                }
              }}
            >
              {isLastPosition ? 'Review Vote' : 'Continue'}
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionPage;
