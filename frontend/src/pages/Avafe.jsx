import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SeventhPart from "../components/SeventhPart";
import Footer from "../components/Footer";

function Avafe() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-white">
      <NavBar />

      <section className="flex-1 px-4 pb-[20px] pt-[26px] sm:px-8 sm:pb-[24px] sm:pt-[34px]">
        <div className="mx-auto max-w-[1450px] rounded-[22px] bg-[color:var(--avac-gold)] px-[26px] py-[36px] sm:min-h-[180px] sm:rounded-[26px] sm:px-[112px] sm:py-[82px]">
          <h1 className="text-[34px] font-bold leading-[1.06]">AVAFE</h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-[12px] inline-flex items-center gap-[8px] text-[12px] font-medium leading-none text-white/95"
          >
            <Link to="/" className="transition-opacity hover:opacity-80">
              Home
            </Link>
            <img
              src="/whiteArrowHead.png"
              alt=""
              aria-hidden="true"
              className="mt-[4px] h-[8px] w-[5px] object-contain"
            />
            <span aria-current="page">AVAFE</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1000px] px-4 text-center">
          <img
            src="/underConstruction.png"
            alt="Under Construction"
            width={740}
            height={530}
            className="mx-auto h-auto w-full max-w-[480px] object-contain"
          />
        </div>
      </section>

      <section className="overflow-hidden bg-[color:var(--avac-gold)] py-[15px] sm:py-[17px]">
        <SeventhPart />
      </section>

      <Footer />
    </main>
  );
}

export default Avafe;
