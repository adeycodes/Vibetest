import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import TestResultsPage from './pages/TestResultsPage';
import BillingPage from './pages/BillingPage';
import PricingPage from './pages/PricingPage';
import './index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/results" element={<TestResultsPage />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path='/pricing' element={<PricingPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);