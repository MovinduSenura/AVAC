import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import HeAn from "./components/HeroAnimation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/hean" element={<HeAn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
