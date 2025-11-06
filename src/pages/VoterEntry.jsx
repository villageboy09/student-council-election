import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  // ERP validation regex: VGU followed by 5-6 digits
  const erpPattern = /^VGU\d{5,6}$/i;

  const isValidErp = erpPattern.test(erpNumber);
  const isFormValid = name.trim() && isValidErp;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if ERP already exists in database
      const { data, error: dbError } = await supabase
        .from('votes')
        .select('erp_number')
        .eq('erp_number', erpNumber.toUpperCase())
        .single();

      if (dbError && dbError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is what we want
        throw dbError;
      }

      if (data) {
        setError('You have already voted with this ERP number.');
        setLoading(false);
        return;
      }

      // Store voter data and proceed
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to VGU Student Council Elections
            </h2>
            <p className="text-gray-600">
              Please enter your details to begin voting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgu-blue focus:border-transparent outline-none transition"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* ERP Number Input */}
            <div>
              <label
                htmlFor="erp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ERP Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="erp"
                value={erpNumber}
                onChange={(e) => setErpNumber(e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                  erpNumber && !isValidErp
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-vgu-blue focus:border-transparent'
                }`}
                placeholder="VGU12345"
                required
              />
              {erpNumber && !isValidErp && (
                <p className="mt-2 text-sm text-red-600">
                  Invalid ERP format. Must be VGU followed by 5-6 digits (e.g.,
                  VGU12345)
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                isFormValid && !loading
                  ? 'bg-vgu-blue hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Checking...' : 'Proceed to Vote'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>One vote per student. Your vote is confidential.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterEntry;
