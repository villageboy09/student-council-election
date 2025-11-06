import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, User, IdCard, Lock, Sparkles } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

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
    <div className="min-h-screen bg-gradient-to-br from-vgu-blue via-blue-600 to-blue-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl overflow-hidden">
          <CardHeader className="text-center pb-4 pt-8 sm:pt-12 bg-gradient-to-b from-blue-50 to-white">
            {/* Animated Check Mark */}
            <div className="flex justify-center mb-6">
              <motion.div
                variants={circleVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 120 120"
                  className="drop-shadow-lg sm:w-[120px] sm:h-[120px]"
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
              className="space-y-2"
            >
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-vgu-blue flex items-center justify-center gap-2">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
                Thank You for Voting!
              </CardTitle>
              <p className="text-base sm:text-lg text-muted-foreground">
                Your vote has been recorded successfully.
              </p>
              <p className="text-sm text-muted-foreground">
                Thank you for participating in the VGU Student Council Elections 2025.
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8 sm:pb-12">
            {/* Voter Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="bg-blue-50/50 border-vgu-blue/20">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-vgu-blue" />
                    <span className="font-semibold text-vgu-blue">Voter:</span>
                    <span className="text-foreground">{voteData.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <IdCard className="h-4 w-4 sm:h-5 sm:w-5 text-vgu-blue" />
                    <span className="font-semibold text-vgu-blue">ERP:</span>
                    <span className="text-foreground">{voteData.erp_number}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Badge variant="secondary" className="flex items-center gap-1 justify-center py-2 px-3">
                <Lock className="h-3 w-3" />
                <span className="text-xs sm:text-sm">Vote is confidential</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 justify-center py-2 px-3 bg-vgu-blue/10 text-vgu-blue hover:bg-vgu-blue/20">
                <Sparkles className="h-3 w-3" />
                <span className="text-xs sm:text-sm">Results announced soon!</span>
              </Badge>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{
                    delay: 1.2 + i * 0.1,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-vgu-gold rounded-full"
                />
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
