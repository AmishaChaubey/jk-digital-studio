import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Welcome from "./components/Welcome";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonial";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import ContactPage from "./components/contact/Contact";
import Portfolio from "./components/Portfolio";
import WhyChooseUs from "./components/WhyChoose";
import AboutPage from "./components/about/About";

// Pages
import PortfolioPage from "./components/portfolio/PortfolioPage";
import ServicesPage from "./components/service/ServicesPage";

// Service Details
import BabyShoot from "./components/service/baby-shoot/baby-shoot";
import WeddingPhotography from "./components/service/wedding-shoot/wedding-shoot";
import PreWedding from "./components/service/prewedding-shoot/prewedding-shoot";
import EventPhotography from "./components/service/event-shoot/event-shoot";
import ProductPhotography from "./components/service/product-photography/product-photography";
import OutdoorPhotography from "./components/service/outdoor-shoot/outdoor-shoot";
import MaternityShoot from "./components/service/materinity-shoot/materinity-shoot";
import WeddingCinemo from "./components/service/wedding-cinemo/wedding-cinemo";
import Portrait from "./components/service/Portrait-shoot/Portrait";
import Birthday from './components/service/birthday-shoot/Birthday';
import IndoorShoot from './components/service/indoor-shoot/Indoor';
import ModelShoot from './components/service/model-shoot/model-shoot';

// Gallery Component
import PhotoStudioWebsite from "./components/gallery/Gallery";
import VisualDiaryGallery from "./components/Gallery";
import LiveEventPhotograpghy from "./components/service/live-event/LiveEvent";

// Video Component
import VideoSections from "./components/videos/VideoSection";
import CallIcon from "./components/Call";
import WhatsAppIcon from "./components/Icon";

import AdminPanel from '../../frontend2/src/components/AdminPanel';

import AdminLogin from '../../frontend2/src/pages/AdminLogin';
import ProtectedRoute from '../../frontend2/src/components/ProtectedRoute';


// ── Layout wrapper: hides Navbar/Footer/Icons on /admin ──────
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      {!isAdmin && <Navbar />}

      {children}

      {!isAdmin && <CallIcon />}
      {!isAdmin && <WhatsAppIcon />}
      {!isAdmin && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Welcome />
                <Services />
                <Stats />
                <VisualDiaryGallery />
                <CTA />
                <Portfolio />
                <WhyChooseUs />
                <Testimonials />
              </>
            }
          />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<PhotoStudioWebsite />} />
          <Route path="/videos" element={<VideoSections />} />

          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/baby-shoot" element={<BabyShoot />} />
          <Route path="/services/indoor-shoot" element={<IndoorShoot />} />
          <Route path="/services/wedding-photography" element={<WeddingPhotography />} />
          <Route path="/services/prewedding-shoot" element={<PreWedding />} />
          <Route path="/services/event-photography" element={<EventPhotography />} />
          <Route path="/services/live-event-photography" element={<LiveEventPhotograpghy />} />
          <Route path="/services/product-photography" element={<ProductPhotography />} />
          <Route path="/services/outdoor-photography" element={<OutdoorPhotography />} />
          <Route path="/services/maternity-shoot" element={<MaternityShoot />} />
          <Route path="/services/portrait-shoot" element={<Portrait />} />
          <Route path="/services/wedding-cinemo" element={<WeddingCinemo />} />
          <Route path="/services/model-shoot" element={<ModelShoot />} />
          <Route path="/services/birthday" element={<Birthday />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  }
/>

<Route path="/admin/login" element={<AdminLogin />} />        </Routes>
      </Layout>
    </Router>
  );
};

export default App;