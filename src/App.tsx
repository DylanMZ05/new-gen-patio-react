import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer";

// Home
import Main from "./pages/Home/Main";
import MarqueeBanner from "./components/MarqueeBanner";
import Services from "./pages/Home/services/services";
import HowWeDoItHome from "./pages/Home/HowWeDoItHome";
import AboutUs from "./pages/Home/AboutUs";
import Clients from "./pages/Home/Clients";
import FAQ from "./pages/Home/FAQ/FAQ";
import BlogsSection from "./pages/Home/BlogsSection";

// Services
import Attached from "./pages/Services/Attached";
import Freestanding from "./pages/Services/Freestanding";
import Cantilever from "./pages/Services/Cantilever";
import ExtraServices from "./pages/Services/ExtraServices";

// Calculator
import Calculator from "./pages/Calculator/Calculator";
import FinancingOptions from "./pages/Calculator/FinancingOptions";

// How We Do It & About Us
import HowWeDoIt from "./pages/WeDoIt&About/WeDoIt";
import AboutUsPage from "./pages/WeDoIt&About/AboutUsPage";

// Blogs
import BlogPage from "./pages/Blogs/BlogPage";

// Free Quote
import FreeQuote from "./pages/FreeQuote/FreeQuote"

// FormPage
import FormPage from "./components/FormPage";

// Página sin Header y Footer

function Layout() {
  const location = useLocation();

  // Definir rutas sin Header y Footer
  const noLayoutRoutes = ["/financing-options"];

  // Verificar si la ruta actual está en la lista
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
              <AboutUs />
              <Clients />
              <FAQ />
              <BlogsSection />
              <MarqueeBanner />
            </main>
          }
        />
        <Route path="/attached" element={<Attached />} />
        <Route path="/freestanding" element={<Freestanding />} />
        <Route path="/cantilever" element={<Cantilever />} />
        <Route path="/extra-services" element={<ExtraServices />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/financing-options" element={<FinancingOptions />} />
        <Route path="/howwedoit" element={<HowWeDoIt />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/freequote" element={<FreeQuote />} />
        <Route path="/formpage" element={<FormPage />} />

        {/* Ruta sin Header y Footer */}
      </Routes>
      {!isNoLayout && <WspButton />}
      {!isNoLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router basename="/new-gen-patio-react">
      <Layout />
    </Router>
  );
}

export default App;
