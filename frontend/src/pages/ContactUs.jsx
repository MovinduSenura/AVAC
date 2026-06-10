import NavBar from "../components/NavBar";
import ContactUsFirstPart from "../components/ContactUsFirstPart";
import FourthPart from "../components/FourthPart";
import ContactUsSecondPart from "../components/ContactUsSecondPart";
import Map from "../components/Map";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";


function ContactUs() {
  return (
    <main className="min-h-screen bg-white text-white">
      <NavBar />

      <section>
        <ContactUsFirstPart />
      </section>

      <section
        id="contact"
        className="bg-white px-4 pb-[10px] pt-[0px] text-black sm:px-6 lg:px-8 lg:mt-0 lg:mb-10"
      >
        <div className="mx-auto max-w-[1450px] rounded-[26px] bg-[#F1F5EB] px-[18px] py-[28px] sm:px-[26px] sm:py-[34px] lg:px-[34px] lg:py-[80px]">
          <FourthPart />
        </div>
      </section>

      <section>
        <ContactUsSecondPart />
      </section>

      <section>
        <Map />
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] text-white sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default ContactUs;
