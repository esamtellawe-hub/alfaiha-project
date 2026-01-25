import React from "react";
import "./index.css";
import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./component/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;
