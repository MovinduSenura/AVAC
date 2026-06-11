import NavBar from "../components/NavBar";
import AboutUsFirstPart from "../components/AboutUsFirstPart";
import AboutUsSecondPart from "../components/AboutUsSecondPart";
import AboutUsThirdPart from "../components/AboutUsThirdPart";
import CountryStrip from "../components/CountryStrip";
import AboutUsContactInfo from "../components/AboutUsContactInfo";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <main className="min-h-screen bg-black text-white">
      <NavBar />
      <section>
        <AboutUsFirstPart />
      </section>

      <section>
        <AboutUsSecondPart />
      </section>

      <section>
        <AboutUsThirdPart />
      </section>

      <section className="group mb-10 bg-white px-4 py-[15px] text-black transition-colors duration-300 hover:bg-[color:var(--avac-gold)] sm:px-8 sm:py-[17px]">
        <CountryStrip />
      </section>

      <section
        id="contact"
        className="bg-black px-4 pb-[50px] pt-[36px] text-black sm:mb-10 sm:mt-15 sm:px-8"
      >
        <div className="mx-auto max-w-[1450px] rounded-[26px] bg-[#F1F5EB] px-[18px] py-[28px] sm:px-[34px] sm:py-[80px]">
          <AboutUsContactInfo />
        </div>
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] text-white sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default AboutUs;
