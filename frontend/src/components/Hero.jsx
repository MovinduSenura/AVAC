function Hero() {
  return (
    <div className="mx-auto min-h-[680px] w-full max-w-[1920px] sm:min-h-[760px] sm:h-[900px]">
      <div className="mx-auto flex h-full w-full flex-col items-center px-4 pt-[22svh] text-center sm:px-6 sm:pt-[30svh]">
        <h1 className="max-w-[1180px] text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[72px] sm:leading-[1.02]">
          Let’s Begin{" "}
          <span className="text-[color:var(--avac-gold)]">
            Your Journey
            <br />
            Into The Future.
          </span>
        </h1>
        <p className="mt-[15px] max-w-[582px] text-[17px] leading-[28px] text-white/88 sm:text-[19px] sm:leading-[30px]">
          Personalized career guidance, expert consultation,
          <br className="hidden sm:block" /> and job matching tailored just for
          you.
        </p>
      </div>
    </div>
  );
}

export default Hero;
