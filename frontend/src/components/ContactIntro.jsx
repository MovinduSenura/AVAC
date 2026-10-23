function ContactIntro() {
  return (
    <div className="w-full pt-[24px] pb-0 text-[#111111] sm:py-[36px]">
      <div className="flex items-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Contact Us
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>
      <h2 className="mt-[14px] text-[34px] font-bold leading-[1.06]">
        Get In <span className="text-[color:var(--avac-gold)]">Touch</span>
      </h2>
      <p className="mx-auto mt-[14px] max-w-[620px] text-[13px] leading-[1.8] text-[#000000] sm:text-[14px]">
        Get in touch with us to discuss your work migration goals.
      </p>

      <div className="mt-[22px] flex flex-wrap gap-[12px]">
        <a
          href="tel:+94112986827"
          className="inline-flex h-[46px] items-center justify-center gap-[8px] rounded-full bg-[color:var(--avac-gold)] px-[26px] text-[14px] font-semibold transition hover:brightness-110"
        >
          <img
            src="/contactPhone.png"
            alt=""
            aria-hidden="true"
            className="h-[14px] w-[14px] object-contain"
          />
          Call Now
        </a>
        <a
          href="mailto:info@avaconsultants.org"
          className="inline-flex h-[46px] items-center justify-center gap-[8px] rounded-full bg-black px-[26px] text-[14px] font-semibold text-white transition hover:bg-[#252525]"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
            className="h-[15px] w-[15px]"
          >
            <rect x="2" y="4" width="16" height="12" rx="1" />
            <path d="m2 5 8 6 8-6" />
          </svg>
          Email Us
        </a>
      </div>

      <div className="mt-[20px] text-[15px] leading-[1.7] sm:text-[16px]">
        <h3 className="font-bold text-[color:var(--avac-gold)]">
          Our philosophy
        </h3>
        <p className="mx-auto mt-[5px] max-w-[620px] text-[13px] leading-[1.8] text-[#000000] sm:text-[14px]">
          We strongly believe that trust is earned through honesty, clarity
          <br className="hidden sm:block" /> and consistency.
        </p>
      </div>
    </div>
  );
}

export default ContactIntro;
