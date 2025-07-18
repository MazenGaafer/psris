import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import ManageEmployees from "./pages/ManageEmployees";
import NotFound from "./pages/NotFound";
import RequestCertificate from "@/pages/RequestCertificate";
import TrackTransactions from "@/pages/TrackTransactions";
import BookAppointment from "@/pages/BookAppointment";
import CivilServices from "@/pages/CivilServices";
import SocialServices from "./pages/SocialServices";
import EducationServices from "./pages/EducationServices";
import HealthServices from "./pages/HealthServices";
import RealEstateServices from "./pages/RealEstateServices";
import BusinessServices from "./pages/BusinessServices";
import UserGuide from "./pages/UserGuide";
import { useEffect } from "react";

const queryClient = new QueryClient();

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/request-certificate" element={<RequestCertificate />} />
          <Route path="/track-transactions" element={<TrackTransactions />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/manage-employees" element={<ManageEmployees />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/services/civil" element={<CivilServices />} />
          <Route path="/services/social" element={<SocialServices />} />
          <Route path="/services/education" element={<EducationServices />} />
          <Route path="/services/health" element={<HealthServices />} />
          <Route path="/services/real-estate" element={<RealEstateServices />} />
          <Route path="/services/business" element={<BusinessServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
