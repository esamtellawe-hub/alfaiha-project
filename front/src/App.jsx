import React from "react";
import "./index.css";
import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./component/Footer.jsx";
function App() {
  return (
    <main className="w-full min-h-screen bg-white">
      <Navbar />

      <Home />

      <Footer />
    </main>
  );
}

export default App;
