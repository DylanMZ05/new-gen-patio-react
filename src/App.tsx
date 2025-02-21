import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer"

// Home
import Main from "./pages/Home/Main";
import Services from "./pages/Home/services/services"
import HowWeDoIt from "./pages/Home/HowWeDoIt";
import AboutUs from "./pages/Home/AboutUs";
import Clients from "./pages/Home/Clients";
import FAQ from "./pages/Home/FAQ";

// Services
import Attached from "./pages/Services/Attached";
import Freestanding from "./pages/Services/Freestanding";
import Cantilever from "./pages/Services/Cantilever";
import ExtraServices from "./pages/Services/ExtraServices";

function App() {
  return (
    <Router basename="/new-gen-patio-react">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Main />
              <Services />
              <HowWeDoIt />
              <AboutUs />
              <Clients />
              <FAQ />
            </main>
          }
        />
        <Route
          path="/attached"
          element={
            <main>
              <Attached />
            </main>
          }
        />
        <Route
          path="/freestanding"
          element={
            <main>
              <Freestanding />
            </main>
          }
        />
        <Route
          path="/cantilever"
          element={
            <main>
              <Cantilever />
            </main>
          }
        />
        <Route
          path="/extra-services"
          element={
            <main>
              <ExtraServices />
            </main>
          }
        />
      </Routes>
      <WspButton />
      <Footer />
    </Router>
  );
}

export default App;
