import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";

import Main from "./components/Home/Main";
import Services from "./components/Home/Services/services"

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
            </>
          }
        />
      </Routes>
      <WspButton />
    </Router>
  );
}

export default App;
