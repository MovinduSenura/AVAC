function FifthPart() {
  return (
    <div className="mx-auto max-w-[1000px] overflow-hidden rounded-[18px] bg-[color:var(--avac-gold)] text-white lg:grid lg:grid-cols-2">
      <div className="relative flex items-center px-[28px] py-[42px] sm:px-[42px] lg:min-h-[245px] lg:px-[68px]">
        <img
          src="/map.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[78%] top-1/2 hidden w-[450px] -translate-x-1/2 -translate-y-1/2 opacity-[1] lg:block"
        />

        <div className="relative z-10 max-w-[390px]">
          <h2 className="text-[38px] font-bold leading-[1.06]">
            Let’s Do Great!
          </h2>

          <p className="mt-[16px] text-[13px] leading-[1.9] text-white/92">
            Lorem Ipsum is simply dummy text the printing and typese
            <br />
            Lorem Ipsum has been the industry&apos;s standard dummy
          </p>

          <button
            type="button"
            className="mt-[28px] inline-flex h-[50px] items-center justify-center gap-[10px] rounded-full bg-black px-[28px] text-[11px] font-semibold text-white cursor-pointer"
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
          className="h-full w-full object-cover rounded-[18px]"
        />
      </div>
    </div>
  );
}

export default FifthPart;
