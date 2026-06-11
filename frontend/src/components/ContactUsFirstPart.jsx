import { Link } from "react-router-dom";

function ContactUsFirstPart() {
  return (
    <section className="bg-white px-4 pb-[22px] pt-[26px] sm:px-8 sm:pb-[30px] sm:pt-[34px]">
      <div className="mx-auto max-w-[1450px] rounded-[22px] bg-[color:var(--avac-gold)] px-[26px] py-[36px] sm:min-h-[180px] sm:rounded-[26px] sm:px-[112px] sm:py-[82px]">
        <div className="flex h-full flex-col justify-center">
          <h1 className="text-[36px] font-bold leading-[1.06] text-white sm:text-[34px]">
            Contact
          </h1>

          <div className="mt-[12px] inline-flex items-center gap-[8px] text-[12px] leading-none font-medium text-white/95">
            <Link to="/" className="block transition-opacity hover:opacity-80">
              Home
            </Link>
            <img
              src="/whiteArrowHead.png"
              alt=""
              aria-hidden="true"
              className="mt-[4px] h-[8px] w-[5px] object-contain"
            />
            <span className="block">Contact</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsFirstPart;
