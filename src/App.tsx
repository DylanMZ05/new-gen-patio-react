import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";

// Componentes globales
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer";
import BlockSection from "./components/BlockSection";

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
import HowWeDoIt from "./pages/WeDoIt&About/WeDoIt";
import AboutUsPage from "./pages/WeDoIt&About/AboutUsPage";

// Blogs
import BlogPage from "./pages/Blogs/BlogPage";

// Free Quote & Forms
import FreeQuote from "./pages/FreeQuote/FreeQuote";
import FormPage from "./components/FormPage";

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
            <BlockSection />
            <Services />
          </>
          } />
        <Route path="/howwedoit" element={
          <>
            <BlockSection />
            <HowWeDoIt />
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
