const pillars = [
  {
    title: "VISION",
    description:
      "Our vision is to be the trusted and distinctive leader in the migration industry, known for our integrity, innovation, and unwavering commitment to enabling international opportunity, supporting workforce needs, and developing skilled global citizens.",
    icon: "/eye.png",
  },
  {
    title: "MISSION",
    description:
      "Our mission is to connect people with possibilities by delivering ethical, innovative, and uniquely client-focused migration services. We support skilled individuals in navigating their path to new beginnings, contributing to national economies through foreign income generation and workforce support, enriching communities, and shaping a more connected world.",
    icon: "/target.png",
  },
  {
    title: "VALUES",
    values: [
      {
        title: "A - Authenticity",
        description: "We act with honesty and integrity.",
      },
      {
        title: "V - Value-Driven Service",
        description:
          "We provide honest guidance, clear processes, and solutions that truly serve our clients’ long-term goals.",
      },
      {
        title: "A - Accuracy",
        description:
          "We operate with precision, compliance, and attention to detail in every application and interaction.",
      },
      {
        title: "C - Collaboration",
        description:
          "We work better together—respectfully, inclusively, and transparently",
      },
    ],
    icon: "/gem.png",
  },
];

function PillarIcon({ src, alt }) {
  return (
    <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[color:var(--avac-gold)] sm:h-[116px] sm:w-[116px]">
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
    <section className="bg-black px-4 pb-[72px] pt-[40px] text-white sm:px-8 sm:pb-[80px] sm:pt-[64px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="mt-3 text-[34px] font-bold leading-[1.06]">
            <span className="text-white">About </span>
            <span className="text-[color:var(--avac-gold)]">
              AVAC
            </span>
          </h2>

          <p className="mx-auto mt-[28px] max-w-[820px] text-[16px] leading-[1.45] text-white/92 sm:mt-18 sm:text-[19px]">
            At AVA Consultants (Pvt) Ltd, we help people take meaningful steps towards 
            <br />
            their future abroad through two dedicated service divisions: AVAC for migration
            <br />
            consultation and AVAFE for job placement and foreign recruitment.
            <br />
            <br />
            Our approach is built on honest advice, careful preparation, and personal 
            <br />
            attention. Whether you need guidance on a migration application or support
            <br />
            finding an overseas employment opportunity, we take time to understand
            <br />
            your goals and guide you with clarity and care. 
          </p>
        </div>

        <div className="mx-auto mt-[56px] grid w-full gap-[44px] sm:mt-[88px] sm:grid-cols-3 sm:gap-[54px]">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <PillarIcon src={pillar.icon} alt={`${pillar.title} icon`} />

              <h3 className="mt-[26px] text-[25px] font-semibold tracking-[-0.02em] text-white sm:mt-[30px]">
                {pillar.title}
              </h3>

              {pillar.values ? (
                <div className="mt-[24px] w-full max-w-[310px] space-y-[20px] text-[15px] leading-[1.6] text-white/90 sm:text-[16px]">
                  {pillar.values.map((value) => (
                    <div key={value.title}>
                      <h4 className="font-semibold text-white">{value.title}</h4>
                      <p className="mt-[6px]">{value.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-[24px] w-full max-w-[310px] text-[15px] leading-[1.6] text-white/90 sm:text-[16px]">
                  {pillar.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUsSecondPart;
