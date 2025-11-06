import { motion } from 'framer-motion';

const CandidateCard = ({ candidate, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
        isSelected
          ? 'ring-4 ring-vgu-blue bg-blue-50'
          : 'bg-white hover:shadow-xl'
      }`}
    >
      <div className="relative">
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="w-full h-48 object-cover"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-vgu-blue text-white rounded-full p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {candidate.name}
        </h3>
        <p className="text-gray-600 text-sm">{candidate.description}</p>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
