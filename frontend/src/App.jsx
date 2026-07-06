import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
              <Route
               path="/" 
               element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
               }
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
