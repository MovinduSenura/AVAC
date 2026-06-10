function Hero() {
  return (
    <div className="mx-auto h-[900px] w-full max-w-[1920px]">
      <div className="mx-auto flex h-full w-full flex-col items-center px-4 pt-[30svh] text-center">
        <h1 className="max-w-[1180px] text-[48px] leading-[1.04] font-bold tracking-[-0.02em] text-white sm:text-[64px] lg:text-[72px] lg:leading-[1.02]">
          Let’s Begin{" "}
          <span className="text-[color:var(--avac-gold)]">
            Your Journey
            <br />
            Into The Future.
          </span>
        </h1>
        <p className="mt-[15px] max-w-[582px] text-[19px] leading-[30px] text-white/88">
          Personalized career guidance, expert consultation,
          <br className="hidden sm:block" /> and job matching tailored just for
          you.
        </p>
      </div>
    </div>
  );
}

export default Hero;
