function FifthPart() {
  return (
    <div className="mx-auto grid max-w-[1000px] overflow-hidden rounded-[18px] bg-[color:var(--avac-gold)] text-white lg:grid-cols-2">
      <div className="relative flex items-center px-[24px] py-[28px] sm:px-[40px] sm:py-[36px] lg:min-h-[245px] lg:px-[68px] lg:py-[42px]">
        <img
          src="/map.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[78%] top-1/2 hidden w-[450px] -translate-x-1/2 -translate-y-1/2 opacity-[1] lg:block"
        />

        <div className="relative z-10 max-w-[390px]">
          <h2 className="text-[34px] font-bold leading-[1.06] sm:text-[38px]">
            Let's Do Great!
          </h2>

          <p className="mt-[16px] text-[13px] leading-[1.9] text-white/92">
            Lorem Ipsum is simply dummy text the printing and typese
            <br />
            Lorem Ipsum has been the industry&apos;s standard dummy
          </p>

          <button
            type="button"
            className="mt-[28px] inline-flex h-[50px] cursor-pointer items-center justify-center gap-[10px] rounded-full bg-black px-[28px] text-[11px] font-semibold text-white"
          >
            <span>Contact Us</span>
            <img
              src="/smallArrow.png"
              alt=""
              className="h-[10px] w-[12px] object-contain"
            />
          </button>
        </div>
      </div>

      <div className="min-h-[240px]">
        <img
          src="/workers.png"
          alt="Healthcare and skilled workers standing together in front of a city skyline"
          className="h-[260px] w-full rounded-[18px] object-cover sm:h-[320px] lg:h-full"
        />
      </div>
    </div>
  );
}

export default FifthPart;
