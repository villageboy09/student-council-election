import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Trophy } from 'lucide-react';
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
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '20px'
    }}>
      <Header />

      {/* Progress Section with Bold Design */}
      <div className="container max-w-7xl mx-auto px-4 mb-8">
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {/* Progress Bar */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <div style={{
              height: '12px',
              background: 'linear-gradient(90deg, #e0e7ff 0%, #ddd6fe 100%)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
                }}
              />
            </div>
          </div>

          {/* Step Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}>
              Step {currentIndex + 1} of {positionFlow.length}
            </div>
            <div style={{
              color: '#4b5563',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <Trophy size={50} color="#f59e0b" style={{ marginBottom: '15px' }} />
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              Select Your {positionLabels[position]}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              Choose one candidate who will represent you best
            </p>
          </div>

          {/* Candidates Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}>
            {positionCandidates.map((candidate, idx) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCandidate(candidate.name)}
                style={{
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{
                  background: selectedCandidate === candidate.name
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: selectedCandidate === candidate.name
                    ? '4px solid #fff'
                    : '2px solid rgba(0,0,0,0.1)',
                  boxShadow: selectedCandidate === candidate.name
                    ? '0 15px 40px rgba(16, 185, 129, 0.4)'
                    : '0 10px 25px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s',
                  transform: selectedCandidate === candidate.name ? 'scale(1.02)' : 'scale(1)'
                }}>
                  {/* Image */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        filter: selectedCandidate === candidate.name ? 'brightness(0.9)' : 'none'
                      }}
                    />
                    {selectedCandidate === candidate.name && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'white',
                        borderRadius: '50%',
                        padding: '8px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                      }}>
                        <CheckCircle size={30} color="#10b981" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: 'bold',
                      color: selectedCandidate === candidate.name ? 'white' : '#1f2937',
                      marginBottom: '10px'
                    }}>
                      {candidate.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: selectedCandidate === candidate.name ? 'rgba(255,255,255,0.9)' : '#6b7280',
                      lineHeight: '1.6'
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
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: '1',
                minWidth: '150px',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '14px',
                border: '3px solid white',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#f5576c';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              <ChevronLeft size={20} />
              Back
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={!selectedCandidate}
              whileHover={selectedCandidate ? { scale: 1.02 } : {}}
              whileTap={selectedCandidate ? { scale: 0.98 } : {}}
              style={{
                flex: '2',
                minWidth: '200px',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '14px',
                border: 'none',
                background: selectedCandidate
                  ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                  : '#9ca3af',
                color: selectedCandidate ? '#78350f' : '#d1d5db',
                cursor: selectedCandidate ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: selectedCandidate
                  ? '0 10px 30px rgba(245, 158, 11, 0.5)'
                  : 'none',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {isLastPosition ? 'Review & Submit' : 'Next Position'}
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionPage;
