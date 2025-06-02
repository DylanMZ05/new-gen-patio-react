import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";

// Componentes globales
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer";
import BlockSection from "./components/BlockSection";
import ImageTextSection from "./components/ImgTxtSection";

// Home
import Main from "./pages/Home/Main";
import MarqueeBanner from "./components/MarqueeBanner";
import Services from "./pages/Home/services/services";
import OurProcessHome from "./pages/Home/OurPromiseHome";
import Clients from "./pages/Home/Clients";
import HowWeDoItHome from "./pages/Home/HowWeDoItHome";
import AboutUsHome from "./pages/Home/AboutUsHome";
import FAQ from "./pages/Home/FAQ/FAQ";
import BlogsSection from "./pages/Home/BlogsSection";

// Services
import Attached from "./pages/Services/Attached";
import Freestanding from "./pages/Services/Freestanding";
import Cantilever from "./pages/Services/Cantilever";
import OutdoorKitchen from "./pages/Services/OutdoorKitchen";
import ConcreteTurf from "./pages/Services/ConcreteTurf";
import OutdoorKitchenModern from "./pages/Services/OutdoorKitchenModern";
import OutdoorKitchenTraditional from "./pages/Services/OutdoorKitchenTraditional";
import PatiosAndPergolasCard from "./pages/Home/services/PatioAndPergolasCard";

// Calculator
import Calculator from "./pages/Calculator/Calculator";
import FinancingOptions from "./pages/Calculator/FinancingOptions";

// How We Do It & About Us
import OurPromise from "./pages/WeDoIt&About/OurPromise";
import OurProcess from "./pages/WeDoIt&About/OurProcess";
import AboutUsPage from "./pages/WeDoIt&About/AboutUsPage";

// Blogs
import BlogPage from "./pages/Blogs/BlogPage";
import BlogSectionPage from "./pages/Blogs/BlogsSectionPage";

// Free Quote & Forms
import FreeQuote from "./pages/FreeQuote/FreeQuote";
import SectionBlock from "./components/SectionBlock";

// Forms
import FormPage from "./pages/Contact/FormPage";
import ContactRedirect from "./pages/Contact/ContactRedirect";

// Tracking
import FreeQuoteTracking from "./pages/traking/freequote-tracking";
import WhatsAppRedirect from "./pages/traking/WhatsAppRedirect";

// Free Quote Popup
import QuotePopup from "./components/QuotePopup";

const sectionsData3 = [
  {
    id: 6,
    title: "Custom Aluminum Pergolas and Cover Patio Builders in Houston",
    description: "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sections = [
  {
    title: "Custom & Exclusive Design",
    text: "Every project is uniquely tailored to your needs, style, and space. We don't offer generic solutions. We create personalized designs that reflect your personality and maximize your patio’s functionality.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
    imagePosition: "right" as const,
  },
  {
    title: "High-Quality & Durable Materials",
    text: "We use premium materials that ensure weather resistance, low maintenance, and a flawless appearance for years to come. Investing in quality means enjoying your outdoor space worry-free.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Expertise & Professionalism Guaranteed",
    text: "Our team of specialists transforms patios with meticulous attention to detail. From design to installation, we ensure the final result exceeds your expectations.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Increased Property Value",
    text: "A well-designed outdoor space not only enhances your lifestyle but also boosts your home’s value. It’s a smart investment that improves both the aesthetics and functionality of your property.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Stress-Free Experience: We Handle Everything",
    text: "From planning to construction, we manage every aspect of the project so you can simply enjoy the process. We commit to meeting deadlines, providing a transparent service, and delivering exactly what you envisioned.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/13.webp",
    imagePosition: "right" as const,
  },
];

const Layout = memo(() => {
  const location = useLocation();

  const layoutRoutes = useMemo(() => [
    "/", "/custom-aluminium-pergola-and-cover-patio-houston",
    "/our-promise-patio-builders-houston", "/howwedoit_patiobuildershouston", "/about-us",
    "/blog", "/blogs/blog/:slug", "/blog/:slug",
    "/attached-covered-patio-houston", "/freestanding-covered-patio-houston",
    "/cantilever-cover-patio-houston", "/outdoor-kitchens-houston",
    "/modern-outdoor-kitchens-houston", "/traditional-outdoor-kitchens-houston",
    "/concrete-and-turf-installation-houston", "/patio-financing-houston",
    "/get-a-free-quote-houston", "/contact-us", "/formpage", "/blog/best-patio-cover-types",
    "/blog/aluminum-vs-wood-pergolas"
  ], []);

  const noLayoutRoutes = useMemo(() => ["/financing-options", "/get-a-free-quote-houston-tracking", "/whatsapp-redirect"], []);
  const isLayoutRoute = layoutRoutes.includes(location.pathname);
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  if (!isLayoutRoute && !isNoLayout) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
        <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-700">The page you are looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a] transition duration-300 cursor-pointer"
        >
          Go back to homepage
        </a>
      </div>
    );
  }

  return (
    <>
      {!isNoLayout && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Main />
              <MarqueeBanner />
              <Services />
              <hr className="text-black/20" />
              <HowWeDoItHome />
              <OurProcessHome />
              <AboutUsHome />
              <Clients />
              <FAQ />
              <BlogsSection />
              <MarqueeBanner />
            </main>
          }
        />
        <Route path="/custom-aluminium-pergola-and-cover-patio-houston" element={
          <main className="flex flex-col justify-center items-center mb-10">
            <BlockSection />
            <SectionBlock sections={sectionsData3} />
            <MarqueeBanner />
            <PatiosAndPergolasCard />
            {sections.map((section, index) => (
              <ImageTextSection key={index} {...section} />
            ))}
          </main>
        } />
        <Route path="/our-promise-patio-builders-houston" element={<><BlockSection /><OurPromise /></>} />
        <Route path="/howwedoit_patiobuildershouston" element={<><BlockSection /><OurProcess /></>} />
        <Route path="/about-us" element={<><BlockSection /><AboutUsPage /></>} />
        <Route path="/blog" element={<><BlockSection /><BlogSectionPage /></>} />
        <Route path="/blogs/blog/:slug" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/attached-covered-patio-houston" element={<Attached />} />
        <Route path="/freestanding-covered-patio-houston" element={<Freestanding />} />
        <Route path="/cantilever-cover-patio-houston" element={<Cantilever />} />
        <Route path="/outdoor-kitchens-houston" element={<OutdoorKitchen />} />
        <Route path="/modern-outdoor-kitchens-houston" element={<OutdoorKitchenModern />} />
        <Route path="/traditional-outdoor-kitchens-houston" element={<OutdoorKitchenTraditional />} />
        <Route path="/concrete-and-turf-installation-houston" element={<ConcreteTurf />} />
        <Route path="/patio-financing-houston" element={<Calculator />} />
        <Route path="/financing-options" element={<FinancingOptions />} />
        <Route path="/get-a-free-quote-houston" element={<FreeQuote />} />
        <Route path="/contact-us" element={<ContactRedirect />} />
        <Route path="/formpage" element={<FormPage />} />
        <Route path="/get-a-free-quote-houston-tracking" element={<FreeQuoteTracking />} />
        <Route path="/whatsapp-redirect" element={<WhatsAppRedirect />} />
      </Routes>
      {!isNoLayout && <QuotePopup />}
      {!isNoLayout && <WspButton />}
      {!isNoLayout && <Footer />}
    </>
  );
});

function App() {
  return (
    <Router basename="/">
      <Layout />
    </Router>
  );
}

export default App;