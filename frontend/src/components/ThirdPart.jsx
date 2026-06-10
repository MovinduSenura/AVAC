import React from "react";

function ThirdPart() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex items-center gap-[10px] justify-center">
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
        <h2 className="mt-[12px] text-[38px] leading-[1.06] font-bold">
          <span className="text-[color:var(--avac-gold)]">
            Escape To Extraordinary
          </span>
          <span className="block text-[color:var(--avac-gold)]">
            Where Every Journey
          </span>
        </h2>
      </div>

      <div className="mt-[72px] flex gap-[0px] min-h-[430px] flex-row items-start justify-center">
        <article className="relative z-10 mt-[92px] -mr-[60px] w-full max-w-[550px] overflow-hidden rounded-[20px] bg-white px-[50px] pb-[38px] pt-[40px] text-black">
          <div className="relative">
            <img
              src="/testimonialsImg.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[18px] top-[0px] h-[230px] w-[270px] object-contain opacity-20"
            />
            <p className="relative z-10 max-w-[492px] text-[18px] leading-[42px] text-[color:var(--avac-gold)] sm:text-[20px]">
              Leverage agile frameworks to provide a <br /> robust synopsis for strategy
              foster Leverage <br /> agile frameworks to provide a robust <br /> synopsis for go
              for strategy foster
            </p>
          </div>
          <div className="relative z-10 mt-[38px] flex items-center justify-between">
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
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F1F5EB] text-[18px] text-[color:var(--avac-gold)] cursor-pointer"
              >
                <img
                src="/arrow-left.png"
                alt=""
                className="block h-[10px] w-[12px] object-contain"
              />
              </button>
              <button
                type="button"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[color:var(--avac-gold)] text-[18px] text-white cursor-pointer"
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
            className="h-[520px] w-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-[18px] right-[18px] inline-flex h-[50px] items-center justify-center gap-[10px] rounded-full bg-white px-[14px] text-[11px] px-[25px] font-semibold text-[color:var(--avac-gold)] cursor-pointer"
          >
            Read More
            <span className="relative top-[0px] flex h-[14px] w-[14px] items-center justify-center">
              <img
                src="/smallGoldArrow.png"
                alt=""
                className="block h-[10px] w-[12px] object-contain"
              />
            </span>
          </button>       
        </div>
      </div>
    </div>
  );
}

export default ThirdPart;
