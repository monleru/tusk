import LegalPage from './components/LegalPage';
import CookieNotice from './components/CookieNotice';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Markets from './components/Markets';
import Solutions from './components/Solutions';
import Footer from './components/Footer';
import ChargebackPage from './components/ChargebackPage';
import ApmsPage from './components/ApmsPage';
import OpenBankingPage from './components/OpenBankingPage';
import SmartOrchestrationPage from './components/SmartOrchestrationPage';
import PayoutsPage from './components/PayoutsPage';
import CardsPage from './components/CardsPage';
import AboutPage from './components/AboutPage';
import FormPage from './components/FormPage';

function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Markets />
      <Solutions />
    </>
  );
}

// Переход на другую страницу должен начинаться с её начала, а не с прежней прокрутки.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chargeback" element={<ChargebackPage />} />
          <Route path="/apms" element={<ApmsPage />} />
          <Route path="/open-banking" element={<OpenBankingPage />} />
          <Route path="/smart-orchestration" element={<SmartOrchestrationPage />} />
          <Route path="/payouts" element={<PayoutsPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/terms-of-use" element={<LegalPage title="Terms of Use" />} />
          <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
