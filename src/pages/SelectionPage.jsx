import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { candidates, positionLabels } from '../data/candidates';
import Header from '../components/Header';
import CandidateCard from '../components/CandidateCard';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Progress Bar */}
      <div className="container max-w-7xl mx-auto px-4 mb-6 sm:mb-8">
        <div className="space-y-2">
          <Progress value={progress} className="h-2 sm:h-3" />
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Step {currentIndex + 1} of {positionFlow.length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-vgu-blue mb-2">
              Select Your {positionLabels[position]}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Choose one candidate from the options below
            </p>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-vgu-blue text-vgu-blue hover:bg-vgu-blue hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedCandidate}
              size="lg"
              className="w-full sm:flex-1 bg-vgu-blue hover:bg-vgu-blue/90"
            >
              {isLastPosition ? 'Review & Submit' : 'Next'}
              {!isLastPosition && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionPage;
