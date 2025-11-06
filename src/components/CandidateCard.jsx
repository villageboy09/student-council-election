import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

const CandidateCard = ({ candidate, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="h-full"
    >
      <Card
        className={cn(
          'cursor-pointer overflow-hidden transition-all duration-300 h-full',
          isSelected
            ? 'ring-4 ring-vgu-blue border-vgu-blue shadow-lg'
            : 'hover:shadow-xl hover:border-primary/50'
        )}
      >
        <div className="relative">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-full h-40 sm:h-48 object-cover"
          />
          {isSelected && (
            <Badge
              className="absolute top-2 right-2 bg-vgu-blue hover:bg-vgu-blue"
            >
              <Check className="h-4 w-4 mr-1" />
              Selected
            </Badge>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl">
            {candidate.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <CardDescription className="text-sm">
            {candidate.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CandidateCard;
