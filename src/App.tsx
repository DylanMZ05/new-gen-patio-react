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
import HowWeDoItHome from "./pages/Home/HowWeDoItHome";
import Clients from "./pages/Home/Clients";
import FAQ from "./pages/Home/FAQ/FAQ";
import BlogsSection from "./pages/Home/BlogsSection";

// Services
import Attached from "./pages/Services/Attached";
import Freestanding from "./pages/Services/Freestanding";
import Cantilever from "./pages/Services/Cantilever";
import OutdoorKitchen from "./pages/Services/OutdoorKitchen";
import ConcreteTurf from "./pages/Services/ConcreteTurf";

// Calculator
import Calculator from "./pages/Calculator/Calculator";
import FinancingOptions from "./pages/Calculator/FinancingOptions";

// How We Do It & About Us
import HowWeDoIt from "./pages/WeDoIt&About/OurPromise";
import OurProcess from "./pages/WeDoIt&About/OurProcess";
import AboutUsPage from "./pages/WeDoIt&About/AboutUsPage";

// Blogs
import BlogPage from "./pages/Blogs/BlogPage";

// Free Quote & Forms
import FreeQuote from "./pages/FreeQuote/FreeQuote";
import FormPage from "./components/FormPage";
import SectionBlock from "./components/SectionBlock";

const sectionsData3 = [
  {
    id: 6,
    title: "What We Offer",
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

// **Layout sin Header y Footer**
const Layout = memo(() => {
  const location = useLocation();
  const noLayoutRoutes = useMemo(() => ["/financing-options"], []);

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

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
              <HowWeDoItHome />
              <Clients />
              <FAQ />
              <BlogsSection />
              <MarqueeBanner />
            </main>
          }
        />
        <Route path="/services" element={
          <>
            <main className="flex flex-col justify-center items-center mb-10">
              <BlockSection />
              <SectionBlock sections={sectionsData3} />
              <MarqueeBanner />
              <Services />
              {sections.map((section, index) => (
                <ImageTextSection key={index} {...section} />
              ))}
            </main>
          </>
          } />
        <Route path="/howwedoit" element={
          <>
            <BlockSection />
            <HowWeDoIt />
          </>
          } />
        <Route path="/ourprocess" element={
          <>
            <BlockSection />
            <OurProcess />
          </>
          } />
        <Route path="/aboutus" element={
          <>
            <BlockSection />
            <AboutUsPage />
          </>
        } />
        <Route path="/blogs" element={
          <>
            <BlockSection />
            <BlogsSection />
          </>
          } />
        <Route path="/attached" element={<Attached />} />
        <Route path="/freestanding" element={<Freestanding />} />
        <Route path="/cantilever" element={<Cantilever />} />
        <Route path="/outdoorkitchen" element={<OutdoorKitchen />} />
        <Route path="/concrete-turf" element={<ConcreteTurf />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/financing-options" element={<FinancingOptions />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/freequote" element={<FreeQuote />} />
        <Route path="/formpage" element={<FormPage />} />
      </Routes>
      {!isNoLayout && <WspButton />}
      {!isNoLayout && <Footer />}
    </>
  );
});

function App() {
  return (
    <Router basename="/new-gen-patio-react">
      <Layout />
    </Router>
  );
}

export default App;
