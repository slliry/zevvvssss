import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import FloatingParticles from './components/FloatingParticles.jsx';
import Hero from './components/Hero.jsx';
import Modules from './components/Modules.jsx';
import Tasks from './components/Tasks.jsx';
import Benefits from './components/Benefits.jsx';
import Metrics from './components/Metrics.jsx';
import Testimonials from './components/Testimonials.jsx';
import Integrations from './components/Integrations.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import Request from './pages/Request.jsx';
import Admin from './pages/Admin.jsx';
import AssetManagement from './pages/AssetManagement.jsx';
import AuditCompliance from './pages/AuditCompliance.jsx';
import TaskManagement from './pages/TaskManagement.jsx';
import ControlManagement from './pages/ControlManagement.jsx';
import RiskManagement from './pages/RiskManagement.jsx';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash ? decodeURIComponent(location.hash) : '';

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F7FFFE] text-[#1A1A1A]">
      <Header />
      <main className="relative -mt-20">
        <FloatingParticles />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

function LandingPage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <Modules />
      <SectionDivider />
      <Tasks />
      <SectionDivider />
      <Benefits />
      <SectionDivider />
      <Metrics />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Integrations />
      <SectionDivider />
      <CTA />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/request" element={<Request />} />
        <Route path="/modules/asset-management" element={<AssetManagement />} />
        <Route path="/modules/audit-compliance" element={<AuditCompliance />} />
        <Route path="/modules/task-management" element={<TaskManagement />} />
        <Route path="/modules/control-management" element={<ControlManagement />} />
        <Route path="/modules/risk-management" element={<RiskManagement />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
