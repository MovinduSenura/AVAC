function CompanySection() {
  return (
    <section
      aria-labelledby="company-heading"
      className="bg-[#F1F0E2] px-4 py-[44px] text-[#111111] sm:px-8 sm:py-[60px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Two Companies, One Commitment
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>
          <h2
            id="company-heading"
            className="mt-[14px] text-[34px] font-bold leading-[1.06]"
          >
            Which <span className="text-[color:var(--avac-gold)]">AVA</span> Are You
            Looking For?
          </h2>
        </div>

        <div className="mt-[36px] grid gap-[24px] sm:grid-cols-2 sm:gap-[40px]">
          <article className="flex flex-col rounded-[24px] border border-[#e5e1d6] bg-white p-[28px] sm:p-[32px] lg:p-[40px]">
            <p className="text-[12px] font-semibold uppercase text-[color:var(--avac-gold)]">
              AVA Consultants (Pvt) Ltd
            </p>
            <p className="mt-[8px] text-[12px] font-semibold text-[color:var(--avac-gold)]">
              BR: PV 00299042
            </p>
            <h3 className="mt-[16px] text-[20px] font-bold leading-[1.4]">
              Work Migration & Visa Consultancy
            </h3>
            <p className="mb-[24px] mt-[14px] text-[15px] leading-[1.8] text-[#5e5e5e] sm:text-[16px]">
              Personalized career guidance, expert visa consultation, and job
              matching across Europe - the services on this site today.
            </p>
            <a
              href="#about"
              className="mt-auto inline-flex min-h-[46px] w-fit items-center justify-center gap-[8px] rounded-full bg-[color:var(--avac-gold)] px-[28px] py-[12px] text-[14px] font-bold transition hover:brightness-110"
            >
              Explore AVAC <span className="relative top-[0px] flex h-[14px] w-[14px] items-center justify-center">
              <img
                src="/smallBlackArrow.png"
                alt=""
                className="mt-[2px] block h-[10px] w-[12px] object-contain"
              />
            </span>
            </a>
          </article>

          <article className="relative flex flex-col rounded-[24px] bg-[#14140F] p-[28px] text-white sm:p-[32px] lg:p-[40px]">
            <div className="mb-[16px] flex justify-end lg:absolute lg:right-[20px] lg:top-[20px] lg:mb-0">
              <span className="rounded-full bg-[color:var(--avac-gold)] px-[14px] py-[6px] text-[10px] font-bold uppercase leading-none text-black">
                Coming soon
              </span>
            </div>
            <p className="text-[12px] font-semibold uppercase text-[color:var(--avac-gold)]">
              AVA Foreign Employment (Pvt) Ltd
            </p>
            <p className="mt-[8px] text-[12px] font-semibold text-[color:var(--avac-gold)]">
              BR: Registration in Process
            </p>
            <h3 className="mt-[16px] text-[20px] font-bold leading-[1.4]">
              Foreign Employment & Recruitment
            </h3>
            <p className="mb-[24px] mt-[14px] text-[15px] leading-[1.8] text-white/70 sm:text-[16px]">
              A dedicated arm for overseas job placement and recruitment services
              - this site is under construction.
            </p>
            <button
              type="button"
              disabled
              className="mt-auto inline-flex min-h-[46px] w-fit cursor-not-allowed items-center justify-center rounded-full border border-white/45 px-[28px] py-[12px] text-[14px] font-bold text-white/75"
            >
              Coming soon
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

export default CompanySection;
