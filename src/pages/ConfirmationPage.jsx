import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Review Your Selections
            </h2>
            <p className="text-gray-600">
              Please verify your choices before submitting
            </p>
          </div>

          {/* Voter Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-vgu-blue mb-3">Voter Information</h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {voteData.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">ERP Number:</span>{' '}
                {voteData.erp_number}
              </p>
            </div>
          </div>

          {/* Selected Candidates */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-vgu-blue mb-4">
              Your Selected Candidates
            </h3>
            {Object.entries(positionLabels).map(([key, label]) => (
              <div
                key={key}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-700">{label}:</span>
                <span className="text-gray-900 font-semibold">
                  {voteData[key]}
                </span>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 text-sm">
              ⚠️ Once submitted, your vote cannot be changed. Please review
              carefully before confirming.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              disabled={loading}
              className="flex-1 px-6 py-4 border-2 border-vgu-blue text-vgu-blue rounded-lg font-semibold hover:bg-vgu-blue hover:text-white transition-all disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-4 bg-vgu-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Confirm & Submit Vote'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
