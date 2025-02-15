import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";

import Main from "./pages/Home/Main";
import Services from "./pages/Home/services"
import HowWeDoIt from "./pages/Home/HowWeDoIt";
import AboutUs from "./pages/Home/AboutUs";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/new-gen-patio-react"
          element={
            <>
              <Main />
              <Services />
              <HowWeDoIt />
              <AboutUs />
            </>
          }
        />
      </Routes>
      <WspButton />
    </Router>
  );
}

export default App;
