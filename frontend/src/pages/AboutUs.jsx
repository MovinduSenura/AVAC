import NavBar from "../components/NavBar";
import AboutUsFirstPart from "../components/AboutUsFirstPart";
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
      <section className="group mb-10 bg-white px-4 py-[15px] text-black transition-colors duration-300 hover:bg-[color:var(--avac-gold)] sm:px-6 sm:py-[17px] lg:px-8">
        <CountryStrip />
      </section>

      <section
        id="contact"
        className="bg-black px-4 pb-[50px] pt-[36px] text-black sm:px-6 lg:px-8 lg:mt-15 lg:mb-10"
      >
        <div className="mx-auto max-w-[1450px] rounded-[26px] bg-[#F1F5EB] px-[18px] py-[28px] sm:px-[26px] sm:py-[34px] lg:px-[34px] lg:py-[80px]">
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
