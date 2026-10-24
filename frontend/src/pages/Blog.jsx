import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import BlogFirstPart from "../components/BlogFirstPart";
import BlogSecondPart from "../components/BlogSecondPart";
import BlogThirdPart from "../components/BlogThirdPart";
import BlogFourthPart from "../components/BlogFourthPart";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";

function Blog() {
  const { hash, key } = useLocation();
  const [postedTestimonials, setPostedTestimonials] = useState([]);
  const [testimonialPage, setTestimonialPage] = useState(1);

  function addTestimonial(testimonial) {
    setPostedTestimonials((current) => [
      { ...testimonial, id: crypto.randomUUID(), tinted: true },
      ...current,
    ]);
    setTestimonialPage(1);
  }

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
        <BlogThirdPart
          postedTestimonials={postedTestimonials}
          currentPage={testimonialPage}
          onPageChange={setTestimonialPage}
        />
      </section>

      <section>
        <BlogFourthPart onPost={addTestimonial} />
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] text-white sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default Blog;
