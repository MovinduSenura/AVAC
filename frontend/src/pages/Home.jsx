import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import SecondPart from "../components/SecondPart";
import CountryStrip from "../components/CountryStrip";
import ThirdPart from "../components/ThirdPart";
import FourthPart from "../components/FourthPart";
import FifthPart from "../components/FifthPart";
import SixthPart from "../components/SixthPart";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";

function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <NavBar />
      <section id="home" className="relative overflow-hidden bg-black">
        <Hero />
      </section>

      <section
        id="about"
        className="relative bg-[linear-gradient(180deg,#ffffff_0_49%,#000000_49%_100%)] px-8 pb-[79px] pt-[22px]"
      >
        <SecondPart />
      </section>

      <section className="group bg-white px-8 py-[17px] text-black transition-colors duration-300 hover:bg-[color:var(--avac-gold)]">
        <CountryStrip />
      </section>

      <section id="blog" className="bg-black px-8 pb-[70px] pt-[94px]">
        <ThirdPart />
      </section>

      <section
        id="contact"
        className="bg-[#F1F5EB] px-4 pb-[80px] pt-[60px] text-black sm:px-6 lg:px-8"
      >
        <FourthPart />
      </section>

      <section className="bg-black px-4 pb-[89px] pt-[90px] sm:px-6 lg:px-8">
        <FifthPart />
      </section>

      <section
        id="services"
        className="bg-black px-4 pb-[78px] pt-[20px] sm:px-6 lg:px-8"
      >
        <SixthPart />
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[17px] text-white">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default Home;
