import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, ChevronLeft, User, IdCard } from 'lucide-react';
import { useVote } from '../context/VoteContext';
import { supabase } from '../lib/supabaseClient';
import { positionLabels } from '../data/candidates';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-vgu-blue">
                Review Your Selections
              </CardTitle>
              <CardDescription className="text-base">
                Please verify your choices before submitting
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Voter Info */}
              <Card className="bg-blue-50/50 border-vgu-blue/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-vgu-blue flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Voter Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>
                    <span>{voteData.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <IdCard className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">ERP Number:</span>
                    <span>{voteData.erp_number}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Candidates */}
              <div className="space-y-3">
                <h3 className="font-semibold text-vgu-blue text-lg flex items-center gap-2">
                  Your Selected Candidates
                </h3>
                <div className="space-y-2">
                  {Object.entries(positionLabels).map(([key, label]) => (
                    <Card key={key} className="bg-muted/30">
                      <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 gap-1 sm:gap-2">
                        <span className="font-medium text-sm sm:text-base">{label}:</span>
                        <span className="text-sm sm:text-base font-semibold text-vgu-blue">
                          {voteData[key]}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Warning */}
              <Alert className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-sm">
                  Once submitted, your vote cannot be changed. Please review carefully before confirming.
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button
                  onClick={handleBack}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                  className="w-full sm:flex-1 border-vgu-blue text-vgu-blue hover:bg-vgu-blue hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  size="lg"
                  className="w-full sm:flex-1 bg-vgu-blue hover:bg-vgu-blue/90"
                >
                  {loading ? 'Submitting...' : 'Confirm & Submit Vote'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
