import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  }, [isSubmitted, navigate]);

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vgu-blue to-blue-600 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center"
      >
        {/* Animated Check Mark */}
        <div className="flex justify-center mb-8">
          <motion.div
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="drop-shadow-lg"
            >
              {/* Circle Background */}
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="#004AAD"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Check Mark */}
              <motion.path
                d="M 30 60 L 50 80 L 90 40"
                fill="none"
                stroke="#FFD700"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
          </motion.div>
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Thank You for Voting!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your vote has been recorded successfully.
          </p>
          <p className="text-gray-500 mb-8">
            Thank you for participating in the VGU Student Council Elections 2025.
          </p>

          {/* Voter Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              <span className="font-semibold">Voter:</span> {voteData.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">ERP:</span> {voteData.erp_number}
            </p>
          </div>

          {/* Confetti Effect Text */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Your vote is confidential and cannot be changed.
            </p>
            <p className="text-sm text-vgu-blue font-semibold">
              Results will be announced soon!
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                delay: 0.8 + i * 0.1,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className="w-3 h-3 bg-vgu-gold rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
