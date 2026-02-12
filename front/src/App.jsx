import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Component/ScrollToTop.jsx";
import "./index.css";
import Navbar from "./Component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./Component/Footer.jsx";
import Services from "./pages/Services.jsx";
import Solutions from "./pages/Solutions.jsx";
import Sectors from "./pages/Sectors.jsx";
import Projects from "./pages/Projects.jsx";
import Partners from "./pages/partners.jsx";
import Sustainability from "./pages/sustainability.jsx";  
import About from "./pages/About.jsx";
import Academy from "./pages/Academy.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Blog from "./pages/blog.jsx";
import News from "./pages/News.jsx";
import Careers from "./pages/Jobs.jsx";
import ApplicationForm from "./pages/ApplicationForm.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/about" element={<About />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/news" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route path="/careers/ApplicationForm" element={<ApplicationForm />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
