import NavBar from "../components/NavBar";
import BlogFirstPart from "../components/BlogFirstPart";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";

function Blog() {
  return (
    <main className="min-h-screen bg-black text-white">
      <NavBar />

      <section>
        <BlogFirstPart />
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] text-white sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default Blog;
