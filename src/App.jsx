import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VoteProvider } from './context/VoteContext';
import { AdminProvider } from './context/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import VotePanel from './pages/VotePanel';
import VoterEntry from './pages/VoterEntry';
import SelectionPage from './pages/SelectionPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <AdminProvider>
      <VoteProvider>
        <Router>
          <Routes>
            {/* Admin Login */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Admin Vote Panel - Protected */}
            <Route path="/vote-panel" element={
              <ProtectedRoute>
                <VotePanel />
              </ProtectedRoute>
            } />

            {/* Voter Entry Page - Protected */}
            <Route path="/" element={
              <ProtectedRoute>
                <VoterEntry />
              </ProtectedRoute>
            } />

            {/* Position Selection Pages - Protected */}
            <Route path="/vote/:position" element={
              <ProtectedRoute>
                <SelectionPage />
              </ProtectedRoute>
            } />

            {/* Confirmation Page - Protected */}
            <Route path="/vote/confirm" element={
              <ProtectedRoute>
                <ConfirmationPage />
              </ProtectedRoute>
            } />

            {/* Thank You Page - Protected */}
            <Route path="/thank-you" element={
              <ProtectedRoute>
                <ThankYouPage />
              </ProtectedRoute>
            } />

            {/* Catch all - redirect to admin login */}
            <Route path="*" element={<AdminLogin />} />
          </Routes>
        </Router>
      </VoteProvider>
    </AdminProvider>
  );
}

export default App;
