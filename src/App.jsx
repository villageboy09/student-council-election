import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VoteProvider } from './context/VoteContext';
import VoterEntry from './pages/VoterEntry';
import SelectionPage from './pages/SelectionPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <VoteProvider>
      <Router>
        <Routes>
          {/* Voter Entry Page */}
          <Route path="/" element={<VoterEntry />} />

          {/* Position Selection Pages */}
          <Route path="/vote/:position" element={<SelectionPage />} />

          {/* Confirmation Page */}
          <Route path="/vote/confirm" element={<ConfirmationPage />} />

          {/* Thank You Page */}
          <Route path="/thank-you" element={<ThankYouPage />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<VoterEntry />} />
        </Routes>
      </Router>
    </VoteProvider>
  );
}

export default App;
