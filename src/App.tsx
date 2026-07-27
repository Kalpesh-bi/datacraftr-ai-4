import Studio from "./pages/Studio";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { useVisitorTracking } from './lib/useVisitorTracking';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Software from './pages/Software';
import Portfolio from './pages/Portfolio';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';


function AppRoutes() {
  useVisitorTracking();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/software" element={<Software />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
