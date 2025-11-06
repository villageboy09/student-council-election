import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-2xl mx-auto px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-lg border-2">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-vgu-blue">
                Welcome to VGU Student Council Elections
              </CardTitle>
              <CardDescription className="text-base">
                Please enter your details to begin voting
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-11"
                    required
                  />
                </div>

                {/* ERP Number Input */}
                <div className="space-y-2">
                  <Label htmlFor="erp" className="text-base">
                    ERP Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="erp"
                    value={erpNumber}
                    onChange={(e) => setErpNumber(e.target.value.toUpperCase())}
                    placeholder="VGU12345"
                    className={`h-11 ${
                      erpNumber && !isValidErp ? 'border-destructive' : ''
                    }`}
                    required
                  />
                  {erpNumber && !isValidErp && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Invalid ERP format. Must be VGU followed by 5-6 digits (e.g., VGU12345)
                    </p>
                  )}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full h-12 text-base bg-vgu-blue hover:bg-vgu-blue/90"
                  size="lg"
                >
                  {loading ? 'Checking...' : 'Proceed to Vote'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <p>One vote per student. Your vote is confidential.</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterEntry;
