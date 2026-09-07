//frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ElectionDates from './pages/ElectionDates'
import ErrorBoundary from './components/ErrorBoundary'
import LocateStationPage from './pages/LocateStationPage'
import WhoRepresentsMe from './pages/WhoRepresentsMe'
import ReadConstitution from './pages/ReadConstitution'

import ProtectedRoute from './components/common/ProtectedRoute';

import AuthHome from './pages/auth/AuthHome';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import VerifyOtp from './pages/auth/VerifyOtp';
import CreatePassword from './pages/auth/CreatePassword';
import CompleteProfile from './pages/auth/CompleteProfile';
import GuestRedirect from './pages/auth/GuestRedirect';

import Dashboard from './pages/dashboard/Dashboard';
import AccountabilityHub from './pages/accountability/AccountabilityHub';
import DonateSupport from './pages/support/DonateSupport';

import ForumPage from './pages/ForumPage';
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/get-started" element={<AuthHome />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/verify" element={<VerifyOtp />} />
          <Route path="/auth/create-password" element={<CreatePassword />} />
          <Route path="/auth/profile" element={<CompleteProfile />} />
          <Route path="/auth/guest" element={<GuestRedirect />} />

          
          <Route path="/accountability" element={<AccountabilityHub />} />

          <Route
            path="/locate"
            element={
              
                <LocateStationPage />
              
            }
          />
          <Route
            path="/read"
            element={
              
                <ReadConstitution />
              
            }
          />
          <Route
            path="/dates"
            element={
        
                <ElectionDates />
              
            }
          />
          <Route
            path="/whorepresents"
            element={
              //<ProtectedRoute>
                <WhoRepresentsMe />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/support" element={<ProtectedRoute><DonateSupport /></ProtectedRoute>} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </Router>
  )
}


