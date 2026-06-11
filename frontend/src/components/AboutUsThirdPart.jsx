const serviceCards = [
  {
    icon: "/abtPassportPlus.png",
    title: "Passport Plus",
    points: ["Beyond Border Immigration", "Worldwide Visa Assistance"],
  },
  {
    icon: "/abutGlobalEntry.png",
    title: "Global Entry",
    points: ["GlobeTrot Visa Services", "Infinity Visa Solutions"],
  },
];

const bottomCards = [
  {
    title: "Our Expertise & Services",
    description:
      "Dolor sit amet, consectetur adipiscing elit. Sed sit amet rcus nun Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet rcus nunc. Duis egestas ac",
  },
  {
    title: "Our Achievements",
    description:
      "Dolor sit amet, consectetur adipiscing elit. Sed sit amet rcus nun Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet rcus nunc. Duis egestas ac",
  },
  {
    title: "Global Presence",
    description:
      "Dolor sit amet, consectetur adipiscing elit. Sed sit amet rcus nun Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet rcus nunc. Duis egestas ac",
  },
];

function AboutUsThirdPart() {
  return (
    <section className="bg-white px-4 pb-[72px] pt-[44px] text-black sm:px-8 sm:pb-[0px] sm:pt-[70px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="grid gap-[0px] sm:grid-cols-[0.95fr_1.15fr] sm:items-start sm:gap-[0px]">
          <div className="mx-auto w-full">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/whyChooseBig.png"
                alt="Team reviewing work together on a laptop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="pt-[4px] sm:pt-[8px] sm:pl-[50px]">
            <div className="flex items-center gap-[6px]">
                <img
                src="/whyChoose.png"
                alt=""
                className="h-[12px] w-[18px] object-contain"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
                Why Choose Us
              </p>              
            </div>

            <h2 className="mt-[14px] max-w-[640px] text-[34px] font-bold leading-[1.06] text-[#1c1d22]">
              Where Wanderlust Meets
              <span className="block text-[color:var(--avac-gold)]">
                Dream Destinations
              </span>
            </h2>

            <p className="mt-[18px] max-w-[500px] text-[14px] leading-[1.95] text-[#727272]">
              Et purus duis sollicitudin dignissim habitant. Egestas nulla quis
              venenatis cras sed eu massa Et purus duis sollicitudin dignissim
              habitant. Egestas nulla quis venenatis cras sed eu massa Et purus
              duis sollicitudin dignissim habitant. Egestas nulla
            </p>

            <div className="mt-[20px] grid max-w-[500px] gap-[16px] sm:grid-cols-2">
              {serviceCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[18px] border border-[#e6d5b5] bg-white px-[18px] py-[18px]"
                >
                  <div className="flex items-center gap-[14px]">
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[color:var(--avac-gold)]">
                      <img
                        src={card.icon}
                        alt=""
                        aria-hidden="true"
                        className="h-[18px] w-[18px] object-contain"
                      />
                    </div>
                    <h3 className="text-[18px] font-bold tracking-[-0.02em] text-[color:var(--avac-gold)]">
                      {card.title}
                    </h3>
                  </div>

                  <div className="mt-[18px] space-y-[10px]">
                    {card.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-[10px] text-[13px] text-[#727272]"
                      >
                        <img
                          src="/goldTick.png"
                          alt=""
                          aria-hidden="true"
                          className="mt-[5px] h-[10px] w-[10px] object-contain"
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[26px] flex flex-col gap-[28px] sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-[46px] w-fit items-center justify-center gap-[10px] rounded-full border border-[color:var(--avac-gold)] px-[20px] text-[12px] font-medium text-[color:var(--avac-gold)] cursor-pointer"
              >
                <span>Read More</span>
                <img
                  src="/smallGoldArrow.png"
                  alt=""
                  className="mt-[2px] h-[10px] w-[12px] object-contain"
                />
              </button>

              <div className="flex items-center gap-[12px]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[color:var(--avac-gold)]">
                  <img
                    src="/whitePhone.png"
                    alt=""
                    aria-hidden="true"
                    className="h-[16px] w-[16px] object-contain"
                  />
                </div>
                <div>
                  <p className="text-[12px] text-[color:var(--avac-gold)]">
                    Need help?
                  </p>
                  <p className="mt-[2px] text-[15px] font-semibold text-[color:var(--avac-gold)]">
                    (+94) 11 298 6827
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative left-1/2 mt-[44px] w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#ffffff_0_25%,#000000_18%_100%)] px-[14px] pb-[16px] pt-[34px] sm:mt-[0px] sm:px-[22px] sm:pb-[80px] sm:pt-[40px]">
          <div className="mx-auto max-w-[1450px]">
            <div className="overflow-hidden rounded-[26px] bg-[#F1F5EB] px-[0px] py-[0px]">
              <div
                className="sm:min-h-[520px]"
                style={{
                  backgroundImage: 'url("/pattern.png")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="mx-auto grid max-w-[1000px] gap-[15px] sm:min-h-[312px] sm:grid-cols-3 sm:items-center sm:gap-[15px]">
                  {bottomCards.map((card) => (
                    <article
                      key={card.title}
                      className="mx-auto w-full max-w-[300px] rounded-[26px] border border-[color:var(--avac-gold)] bg-white text-center mt-20 pt-50 pb-8"
                    >
                      <h3 className="text-[18px] font-bold tracking-[-0.02em] text-[color:var(--avac-gold)]">
                        {card.title}
                      </h3>
                      <p className="mx-auto mt-[10px] max-w-[250px] text-[11px] leading-[2.1] text-[#727272]">
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsThirdPart;
