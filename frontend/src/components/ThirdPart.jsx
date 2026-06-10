function ThirdPart() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex items-center justify-center gap-[10px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
          Client Testimonials
        </p>
        <img
          src="/paperRocket.svg"
          alt=""
          className="h-[12px] w-[18px] object-contain"
        />
      </div>
      <div className="text-center">
        <h2 className="mt-[12px] text-[34px] font-bold leading-[1.06] sm:text-[38px]">
          <span className="text-[color:var(--avac-gold)]">
            Escape To Extraordinary
          </span>
          <span className="block text-[color:var(--avac-gold)]">
            Where Every Journey
          </span>
        </h2>
      </div>

      <div className="mt-[48px] flex flex-col gap-[24px] lg:mt-[72px] lg:min-h-[430px] lg:flex-row lg:items-start lg:justify-center lg:gap-[0px]">
        <article className="relative z-10 w-full max-w-[550px] overflow-hidden rounded-[20px] bg-white px-[24px] pb-[30px] pt-[28px] text-black sm:px-[34px] sm:pb-[34px] sm:pt-[32px] lg:mt-[92px] lg:-mr-[60px] lg:px-[50px] lg:pb-[38px] lg:pt-[40px]">
          <div className="relative">
            <img
              src="/testimonialsImg.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[0px] top-[8px] h-[170px] w-[200px] object-contain opacity-20 sm:right-[18px] sm:top-[0px] sm:h-[230px] sm:w-[270px]"
            />
            <p className="relative z-10 max-w-[492px] text-[16px] leading-[30px] text-[color:var(--avac-gold)] sm:text-[18px] sm:leading-[36px] lg:text-[20px] lg:leading-[42px]">
              Leverage agile frameworks to provide a <br /> robust synopsis for
              strategy foster Leverage <br /> agile frameworks to provide a
              robust <br /> synopsis for go for strategy foster
            </p>
          </div>
          <div className="relative z-10 mt-[28px] flex flex-col gap-[18px] sm:flex-row sm:items-center sm:justify-between lg:mt-[38px]">
            <div className="flex items-center gap-[14px]">
              <span className="h-[48px] w-[48px] rounded-full bg-[#D9D9D9]" />
              <div>
                <p className="text-[15px] font-semibold text-[color:var(--avac-gold)]">
                  Eleanor Pena
                </p>
                <p className="text-[12px] text-[#727272]">President of Sales</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F1F5EB] text-[18px] text-[color:var(--avac-gold)]"
              >
                <img
                  src="/arrow-left.png"
                  alt=""
                  className="block h-[10px] w-[12px] object-contain"
                />
              </button>
              <button
                type="button"
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[color:var(--avac-gold)] text-[18px] text-white"
              >
                <img
                  src="/arrow-right.png"
                  alt=""
                  className="block h-[10px] w-[12px] object-contain"
                />
              </button>
            </div>
          </div>
        </article>

        <div className="relative w-full max-w-[540px] overflow-hidden rounded-[20px]">
          <img
            src="/leafLady.png"
            alt="Farmer holding fresh produce"
            className="h-[360px] w-full object-cover sm:h-[440px] lg:h-[520px]"
          />
          <button
            type="button"
            className="absolute bottom-[18px] right-[18px] inline-flex h-[50px] cursor-pointer items-center justify-center gap-[10px] rounded-full bg-white px-[25px] text-[11px] font-semibold text-[color:var(--avac-gold)]"
          >
            Read More
            <span className="relative top-[0px] flex h-[14px] w-[14px] items-center justify-center">
              <img
                src="/smallGoldArrow.png"
                alt=""
                className="mt-[2px] block h-[10px] w-[12px] object-contain"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThirdPart;
