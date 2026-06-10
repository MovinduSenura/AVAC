const pillars = [
  {
    title: "VISION",
    description:
      "Our vision is to be the\ntrusted and distinctive\nleader in the migration\nindustry, known for our\nintegrity, innovation, and\nunwavering commitment\nto enabling international\nopportunity, supporting\nworkforce needs, and\ndeveloping skilled global\ncitizens.",
    icon: "/eye.png",
  },
  {
    title: "MISSION",
    description:
      "Our mission is to connect\npeople with possibilities\nby delivering ethical,\ninnovative, and uniquely\nclient-focused migration\nservices. We support\nskilled individuals in\nnavigating their path to\nnew beginnings,\ncontributing to national\neconomies through\nforeign income\ngeneration and\nworkforce support,\nenriching communities,\nand shaping a more\nconnected world.",
    icon: "/target.png",
  },
  {
    title: "VALUES",
    description:
      "Et purus duis\nsollicitudin dignissim\nhabitant. Egestas nulla\nquis venenatis cras sed\neu massa Et purus duis\nsollicitudin dignissim\nhabitant. Egestas nulla\nquis venenatis cras sed\neu massa Et purus duis\nsollicitudin dignissim\nhabitant. Egestas nulla",
    icon: "/gem.png",
  },
];

function PillarIcon({ src, alt }) {
  return (
    <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[color:var(--avac-gold)] sm:h-[108px] sm:w-[108px] lg:h-[116px] lg:w-[116px]">
      <img
        src={src}
        alt={alt}
        className="h-[65px] w-[65px] object-contain sm:h-[65px] sm:w-[65px]"
      />
    </div>
  );
}

function AboutUsSecondPart() {
  return (
    <section className="bg-black px-4 pb-[72px] pt-[40px] text-white sm:px-6 sm:pb-[90px] sm:pt-[56px] lg:px-8 lg:pb-[80px] lg:pt-[64px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="mt-3 text-[38px] font-bold leading-[1.06] sm:text-[52px] lg:text-[34px]">
            <span className="text-white">About </span>
            <span className="text-[color:var(--avac-gold)]">
              AVA Consultants
            </span>
          </h2>

          <p className="mx-auto mt-[28px] max-w-[820px] text-[16px] leading-[1.45] text-white/92 sm:text-[18px] lg:mt-18 lg:text-[19px]">
            At AVAC, we provide refined work migration solutions grounded in trust,
            <br />
            discretion, and precision. Our approach combines deep industry expertise
            <br />
            with a strong commitment to clarity, ensuring both individuals and
            <br />
            organizations receive thoughtful, well-managed support throughout their
            <br />
            journey. By prioritizing accuracy, professionalism, and lasting relationships,
            <br />
            we deliver an experience that is as dependable as it is seamless.
          </p>
        </div>

        <div className="mx-auto mt-[56px] grid max-w-[980px] gap-[44px] sm:mt-[70px] sm:grid-cols-2 lg:mt-[88px] lg:max-w-[1120px] lg:grid-cols-3 lg:gap-[54px]">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="flex flex-col items-center text-center"
            >
              <PillarIcon src={pillar.icon} alt={`${pillar.title} icon`} />

              <h3 className="mt-[26px] text-[25px] font-semibold tracking-[-0.02em] text-white lg:mt-[30px]">
                {pillar.title}
              </h3>

              <p className="mt-[24px] max-w-[310px] whitespace-pre-line text-[15px] leading-[1.28] text-white/90 sm:text-[16px]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUsSecondPart;
