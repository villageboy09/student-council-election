import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVote } from '../context/VoteContext';
import { candidates, positionLabels } from '../data/candidates';
import Header from '../components/Header';
import CandidateCard from '../components/CandidateCard';

const SelectionPage = () => {
  const { position } = useParams();
  const navigate = useNavigate();
  const { voteData, updateVoteData } = useVote();
  const [selectedCandidate, setSelectedCandidate] = useState(
    voteData[position] || ''
  );

  // Position flow order
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
    // Redirect to start if no voter data
    if (!voteData.name || !voteData.erp_number) {
      navigate('/');
    }
  }, [voteData, navigate]);

  const handleNext = () => {
    if (!selectedCandidate) return;

    // Save selection
    updateVoteData(position, selectedCandidate);

    // Navigate to next position or confirmation
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

  // Progress calculation
  const progress = ((currentIndex + 1) / positionFlow.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-vgu-blue"
          />
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          Step {currentIndex + 1} of {positionFlow.length}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Select Your {positionLabels[position]}
            </h2>
            <p className="text-gray-600">
              Choose one candidate from the options below
            </p>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {positionCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidate === candidate.name}
                onSelect={() => setSelectedCandidate(candidate.name)}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className="px-8 py-3 border-2 border-vgu-blue text-vgu-blue rounded-lg font-semibold hover:bg-vgu-blue hover:text-white transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedCandidate}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                selectedCandidate
                  ? 'bg-vgu-blue text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLastPosition ? 'Review & Submit' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionPage;
