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
        className="relative bg-[linear-gradient(180deg,#ffffff_0_49%,#000000_49%_100%)] px-4 pb-[60px] pt-[18px] sm:px-6 sm:pb-[70px] sm:pt-[22px] lg:px-8 lg:pb-[79px]"
      >
        <SecondPart />
      </section>

      <section className="group bg-white px-4 py-[15px] text-black transition-colors duration-300 hover:bg-[color:var(--avac-gold)] sm:px-6 sm:py-[17px] lg:px-8">
        <CountryStrip />
      </section>

      <section
        id="blog"
        className="bg-black px-4 pb-[56px] pt-[70px] sm:px-6 sm:pb-[64px] sm:pt-[82px] lg:px-8 lg:pb-[70px] lg:pt-[94px]"
      >
        <ThirdPart />
      </section>

      <section
        id="contact"
        className="bg-[#F1F5EB] px-4 pb-[64px] pt-[48px] text-black sm:px-6 sm:pb-[72px] sm:pt-[54px] lg:px-8 lg:pb-[80px] lg:pt-[60px]"
      >
        <FourthPart />
      </section>

      <section className="bg-black px-4 pb-[70px] pt-[72px] sm:px-6 sm:pb-[80px] sm:pt-[82px] lg:px-8 lg:pb-[89px] lg:pt-[90px]">
        <FifthPart />
      </section>

      <section
        id="services"
        className="bg-black px-4 pb-[64px] pt-[20px] sm:px-6 sm:pb-[72px] lg:px-8 lg:pb-[78px]"
      >
        <SixthPart />
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] text-white sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default Home;
