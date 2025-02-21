import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer";

// Home
import Main from "./pages/Home/Main";
import Services from "./pages/Home/services/services";
import HowWeDoItHome from "./pages/Home/HowWeDoItHome";
import AboutUs from "./pages/Home/AboutUs";
import Clients from "./pages/Home/Clients";
import FAQ from "./pages/Home/FAQ";

// Services
import Attached from "./pages/Services/Attached";
import Freestanding from "./pages/Services/Freestanding";
import Cantilever from "./pages/Services/Cantilever";
import ExtraServices from "./pages/Services/ExtraServices";

// Calculator
import Calculator from "./pages/Calculator/Calculator";
import FinancingOptions from "./pages/Calculator/FinancingOptions";

// How We Do It
import HowWeDoIt from "./pages/WeDoIt&About/WeDoIt";

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
              <Services />
              <HowWeDoItHome />
              <AboutUs />
              <Clients />
              <FAQ />
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