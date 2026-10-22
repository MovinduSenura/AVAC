import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import BlogFirstPart from "../components/BlogFirstPart";
import BlogSecondPart from "../components/BlogSecondPart";
import BlogThirdPart from "../components/BlogThirdPart";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";

function Blog() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [hash, key]);

  return (
    <main className="min-h-screen bg-black text-white">
      <NavBar />

      <section>
        <BlogFirstPart />
      </section>

      <section>
        <BlogSecondPart />
      </section>

      <section>
        <BlogThirdPart />
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] text-white sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default Blog;
