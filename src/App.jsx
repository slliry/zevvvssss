import { useEffect, lazy, Suspense } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import FloatingParticles from './components/FloatingParticles.jsx';
import Hero from './components/Hero.jsx';
import ProductVideo from './components/ProductVideo.jsx';
import Modules from './components/Modules.jsx';
import Tasks from './components/Tasks.jsx';
import Benefits from './components/Benefits.jsx';
import Metrics from './components/Metrics.jsx';
import Testimonials from './components/Testimonials.jsx';
import Integrations from './components/Integrations.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import ChatAssistant from './components/ChatAssistant.jsx';
import SEO from './components/SEO.jsx';
import TranslationEditor from './components/TranslationEditor.jsx';
import TranslationEditorToggle from './components/TranslationEditorToggle.jsx';
import LanguageFallbackNotification from './components/LanguageFallbackNotification.jsx';
import TranslationClickHandler from './components/TranslationClickHandler.jsx';
import BackToTop from './components/BackToTop.jsx';
import ReadingProgress from './components/ReadingProgress.jsx';

const Request = lazy(() => import('./pages/Request.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const AssetManagement = lazy(() => import('./pages/AssetManagement.jsx'));
const AuditCompliance = lazy(() => import('./pages/AuditCompliance.jsx'));
const TaskManagement = lazy(() => import('./pages/TaskManagement.jsx'));
const ControlManagement = lazy(() => import('./pages/ControlManagement.jsx'));
const RiskManagement = lazy(() => import('./pages/RiskManagement.jsx'));
const OperationalRiskManagement = lazy(() => import('./pages/OperationalRiskManagement.jsx'));
const VulnerabilityManagement = lazy(() => import('./pages/VulnerabilityManagement.jsx'));
const IncidentManagement = lazy(() => import('./pages/IncidentManagement.jsx'));
const Consulting = lazy(() => import('./pages/Consulting.jsx'));
const BusinessConsulting = lazy(() => import('./pages/BusinessConsulting.jsx'));
const IsMaturityCase = lazy(() => import('./pages/IsMaturityCase.jsx'));
const ProjectManagement = lazy(() => import('./pages/ProjectManagement.jsx'));
const BizProcessMethodology = lazy(() => import('./pages/BizProcessMethodology.jsx'));
const IsAudit = lazy(() => import('./pages/IsAudit.jsx'));
const IsRiskManagementConsulting = lazy(() => import('./pages/IsRiskManagementConsulting.jsx'));
const IsArchitecture = lazy(() => import('./pages/IsArchitecture.jsx'));
const VulnAssessmentConsulting = lazy(() => import('./pages/VulnAssessmentConsulting.jsx'));
const FinanceRiskCase = lazy(() => import('./pages/FinanceRiskCase.jsx'));
const ITAuditCase = lazy(() => import('./pages/ITAuditCase.jsx'));

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
      <ReadingProgress />
      <Header />
      <main className="relative -mt-20">
        <FloatingParticles />
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
      <BackToTop />
      <LanguageFallbackNotification />
      <TranslationEditor />
      <TranslationEditorToggle />
      <TranslationClickHandler />
    </div>
  );
}

function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

function LandingPage() {
  return (
    <>
      <SEO url="/" />
      <Hero />
      <SectionDivider />
      <ProductVideo />
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
    <Suspense fallback={<div className="min-h-screen bg-[#F7FFFE]" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/request" element={<Request />} />
          <Route path="/modules/asset-management" element={<AssetManagement />} />
          <Route path="/modules/audit-compliance" element={<AuditCompliance />} />
          <Route path="/modules/task-management" element={<TaskManagement />} />
          <Route path="/modules/control-management" element={<ControlManagement />} />
          <Route path="/modules/risk-management" element={<RiskManagement />} />
          <Route path="/modules/operational-risk-management" element={<OperationalRiskManagement />} />
          <Route path="/modules/vulnerability-management" element={<VulnerabilityManagement />} />
          <Route path="/modules/incident-management" element={<IncidentManagement />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/consulting/business" element={<BusinessConsulting />} />
          <Route path="/consulting/cases/is-maturity" element={<IsMaturityCase />} />
          <Route path="/consulting/project-management" element={<ProjectManagement />} />
          <Route path="/consulting/biz-process-methodology" element={<BizProcessMethodology />} />
          <Route path="/consulting/is-audit" element={<IsAudit />} />
          <Route path="/consulting/is-risk-management" element={<IsRiskManagementConsulting />} />
          <Route path="/consulting/is-architecture" element={<IsArchitecture />} />
          <Route path="/consulting/vuln-assessment" element={<VulnAssessmentConsulting />} />
          <Route path="/consulting/cases/finance-risk" element={<FinanceRiskCase />} />
          <Route path="/consulting/cases/it-audit" element={<ITAuditCase />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
