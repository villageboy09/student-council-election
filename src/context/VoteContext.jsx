import { createContext, useContext, useState } from 'react';

const VoteContext = createContext();

export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
};

export const VoteProvider = ({ children }) => {
  const [voteData, setVoteData] = useState({
    name: '',
    erp_number: '',
    president: '',
    vice_president: '',
    secretary: '',
    treasurer: '',
    management_head: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateVoteData = (field, value) => {
    setVoteData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetVoteData = () => {
    setVoteData({
      name: '',
      erp_number: '',
      president: '',
      vice_president: '',
      secretary: '',
      treasurer: '',
      management_head: '',
    });
    setIsSubmitted(false);
  };

  return (
    <VoteContext.Provider
      value={{
        voteData,
        updateVoteData,
        resetVoteData,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};
