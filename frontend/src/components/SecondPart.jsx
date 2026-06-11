import { useEffect, useRef, useState } from "react";

const servicePoints = [
  "Where trust meets opportunity",
  "Expert guidance. Proven results",
  "Your future, our responsibility",
  "Turning dreams into destinations",
];

const countryGroups = [
  "a. Poland",
  "b. Latvia",
  "c. Lithuania",
  "d. Czech Republic",
  "e. Slovakia",
  "f. Slovenia",
  "g. Hungary",
  "h. Serbia",
];

const aboutCollageImages = [
  {
    key: "skyline",
    src: "/abtUp.png",
    alt: "City skyline at night",
    className: "left-[58.1%] top-[14.0%] w-[41.9%] rounded-[28px]",
    move: "translate3d(0, -120%, 0)",
    delay: 70,
  },
  {
    key: "dots",
    src: "/abtLeftTwo.png",
    alt: "",
    className: "left-0 top-[54.3%] w-[52.57%]",
    move: "translate3d(-120%, 0, 0)",
    delay: 100,
  },
  {
    key: "passport",
    src: "/abtLeftOne.png",
    alt: "Passport being stamped",
    className: "left-[4%] top-10 w-[50.52%] rounded-[28px]",
    move: "translate3d(-120%, 0, 0)",
    delay: 0,
  },
  {
    key: "money",
    src: "/abtRight.png",
    alt: "Euro banknotes and coins",
    className: "left-[41.15%] top-[48.7%] w-[49.5%] rounded-[28px]",
    move: "translate3d(120%, 0, 0)",
    delay: 150,
  },
  {
    key: "experience",
    src: "/abtDown.png",
    alt: "10 plus years of experience badge",
    className: "left-[7.6%] top-[59.2%] w-[29.9%] rounded-[24px]",
    move: "translate3d(0, 120%, 0)",
    delay: 125,
  },
];

function SecondPart() {
  const [isLeftCountryOpen, setIsLeftCountryOpen] = useState(false);
  const [isRightCountryOpen, setIsRightCountryOpen] = useState(false);
  const [selectedLeftCountry, setSelectedLeftCountry] = useState("");
  const [selectedRightCountry, setSelectedRightCountry] = useState("");
  const [isAboutCollageHovered, setIsAboutCollageHovered] = useState(false);
  const leftCountryRef = useRef(null);
  const rightCountryRef = useRef(null);

  const countryOptions = countryGroups.map((country) =>
    country.replace(/^[a-z]\.\s*/i, ""),
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      const target = event.target;
      const clickedInsideLeft = leftCountryRef.current?.contains(target);
      const clickedInsideRight = rightCountryRef.current?.contains(target);

      if (!clickedInsideLeft && !clickedInsideRight) {
        setIsLeftCountryOpen(false);
        setIsRightCountryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <div className="grid gap-[28px] sm:grid-cols-[525px_1fr] sm:items-center">
        <div className="overflow-hidden">
          <div
            className="relative w-full"
            style={{ aspectRatio: "525 / 618" }}
            onMouseEnter={() => setIsAboutCollageHovered(true)}
            onMouseLeave={() => setIsAboutCollageHovered(false)}
            onFocus={() => setIsAboutCollageHovered(true)}
            onBlur={() => setIsAboutCollageHovered(false)}
            tabIndex={0}
          >
            {aboutCollageImages.map((image) => (
              <img
                key={image.key}
                src={image.src}
                alt={image.alt}
                aria-hidden={image.alt ? undefined : "true"}
                className={`absolute h-auto transform-gpu ${image.className}`}
                style={{
                  transform: isAboutCollageHovered
                    ? image.move
                    : "translate3d(0, 0, 0)",
                  opacity: isAboutCollageHovered ? 0 : 1,
                  willChange: "transform, opacity",
                  transitionProperty: "transform, opacity",
                  transitionDuration: "760ms, 460ms",
                  transitionTimingFunction:
                    "cubic-bezier(0.16, 1, 0.3, 1), ease-out",
                  transitionDelay: isAboutCollageHovered
                    ? `${image.delay}ms, ${image.delay + 140}ms`
                    : "0ms, 0ms",
                }}
              />
            ))}
          </div>
        </div>

        <article className="px-[6px] sm:px-0">
          <div className="flex items-center gap-[10px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
              About Us
            </p>
            <img
              src="/paperRocket.svg"
              alt=""
              className="h-[12px] w-[18px] object-contain"
            />
          </div>
          <h2 className="mt-[10px] max-w-[420px] text-[34px] font-bold leading-[1.06] text-[#16171A] sm:text-[38px]">
            We Provide The Best
            <span className="block text-[color:var(--avac-gold)]">
              Service For Consulting
            </span>
          </h2>
          <p className="mt-[14px] max-w-[470px] text-[13px] leading-[1.8] text-[#000000]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <br />
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
          </p>

          <div className="mt-[22px] grid gap-x-[26px] gap-y-[18px] text-[13px] leading-[1.75] text-[#000000] sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-[8px]">
                <img
                  src="/tickBox.png"
                  alt=""
                  className="h-[14px] w-[14px] object-contain"
                />
                <p className="font-semibold text-[#000000]">Visa Guidelines</p>
              </div>
              <p className="mt-[10px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </p>
            </div>

            <div>
              <div className="flex items-center gap-[8px]">
                <img
                  src="/tickBox.png"
                  alt=""
                  className="h-[14px] w-[14px] object-contain"
                />
                <p className="font-semibold text-[#000000]">
                  Latest Information
                </p>
              </div>
              <p className="mt-[10px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-[30px] inline-flex h-[50px] cursor-pointer items-center justify-center gap-[10px] rounded-full bg-[color:var(--avac-gold)] px-[28px] text-[11px] font-semibold text-white"
          >
            <span className="leading-none">Read More</span>
            <span className="relative top-[0px] flex h-[14px] w-[14px] items-center justify-center">
              <img
                src="/smallArrow.png"
                alt=""
                className="block h-[10px] w-[12px] object-contain"
              />
            </span>
          </button>
        </article>
      </div>

      <div className="mt-[0px] grid overflow-hidden rounded-[28px] bg-[#F1F5EB] sm:grid-cols-[50%_50.5%] sm:rounded-[40px]">
        <div className="px-[24px] pb-[34px] pt-[38px] text-black sm:px-[50px] sm:pb-[54px] sm:pt-[62px]">
          <div className="flex items-center gap-[10px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
              Our Services
            </p>
            <img
              src="/paperRocket.svg"
              alt=""
              className="h-[12px] w-[18px] object-contain"
            />
          </div>

          <h3 className="mt-[18px] max-w-[420px] text-[34px] font-bold leading-[1.06] text-[#16171A] sm:text-[38px]">
            Turning Dreams
            <span className="block">Into Destinations</span>
            <span className="block text-[color:var(--avac-gold)]">
              Discover Your
            </span>
            <span className="block text-[color:var(--avac-gold)]">
              Next Move
            </span>
          </h3>

          <div className="mt-[28px]">
            <p className="text-[14px] font-bold text-[#000000]">
              Migration Consultancy
            </p>
            <ul className="mt-[10px] space-y-[8px] text-[13px] leading-[1.8] text-[#000000]">
              {servicePoints.map((item) => (
                <li key={item} className="flex items-start gap-[10px]">
                  <img
                    src="/tickBox.png"
                    alt=""
                    className="mt-[6px] h-[12px] w-[12px] shrink-0 object-contain"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <img
            src="/engineer.png"
            alt="Engineer standing with folded arms"
            className="h-[280px] w-full object-cover sm:h-full sm:rounded-[40px]"
          />
        </div>
      </div>

      <div className="mt-[70px] flex flex-col gap-[28px] rounded-[24px] bg-[color:var(--avac-gold)] px-[20px] py-[28px] text-white sm:mt-[100px] sm:min-h-[330px] sm:flex-row sm:items-center sm:justify-between sm:px-[50px] sm:py-[36px]">
        <div className="relative max-w-[560px]">
          <img
            src="/map.png"
            alt=""
            className="pointer-events-none absolute left-[30px] top-[40px] hidden w-[460px] opacity-[1] mix-blend-screen sm:block"
          />
          <div className="relative z-10">
            <h3 className="text-[32px] font-bold leading-[1.06] sm:text-[38px]">
              Are you ready to fly?
            </h3>
            <p className="mt-[10px] text-[13px] font-bold text-[#000000] sm:text-[14px]">
              Preferred Job & Countries in Europe (Choose 2)
            </p>
            <div className="mt-[5px] max-w-[620px] text-[13px] leading-[1.9] text-[#000000] sm:text-[14px]">
              <div className="flex flex-wrap gap-x-[22px]">
                {countryGroups.slice(0, 4).map((country) => (
                  <span key={country}>{country}</span>
                ))}
              </div>
              <div className="mt-[2px] flex flex-wrap gap-x-[22px]">
                {countryGroups.slice(4).map((country) => (
                  <span key={country}>{country}</span>
                ))}
              </div>
            </div>

            <form className="relative z-10 mt-[16px] grid max-w-full gap-[14px] sm:w-[640px] sm:grid-cols-[250px_250px] sm:gap-x-[0px] sm:gap-y-[20px]">
              <div
                ref={leftCountryRef}
                className="relative w-full sm:max-w-[230px]"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsLeftCountryOpen((open) => !open);
                    setIsRightCountryOpen(false);
                  }}
                  className="flex h-[45px] w-full cursor-pointer items-center justify-between rounded-full border border-[#E3DBD8] bg-white px-[14px] text-left text-[11px] outline-none"
                >
                  <span
                    className={
                      isLeftCountryOpen
                        ? "text-[#BABABA]"
                        : selectedLeftCountry
                          ? "text-[#000000]"
                          : "text-[#BABABA]"
                    }
                  >
                    {isLeftCountryOpen
                      ? "-Select Option-"
                      : selectedLeftCountry || "Select Country"}
                  </span>
                  <span
                    className={`mr-1 border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-[#E3DBD8] transition ${
                      isLeftCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLeftCountryOpen ? (
                  <div className="absolute left-0 top-[44px] z-30 w-full overflow-hidden rounded-[6px] bg-white py-[8px] text-[#000000]">
                    {countryOptions.map((country) => (
                      <button
                        key={`left-${country}`}
                        type="button"
                        onClick={() => {
                          setSelectedLeftCountry(country);
                          setIsLeftCountryOpen(false);
                        }}
                        disabled={selectedRightCountry === country}
                        className={`block w-full px-[22px] py-[8px] text-left text-[11px] leading-[1.6] transition ${
                          selectedRightCountry === country
                            ? "cursor-not-allowed text-[#bfbfbf]"
                            : "cursor-pointer hover:bg-[#f6f6f6]"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div
                ref={rightCountryRef}
                className="relative w-full sm:max-w-[230px]"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsRightCountryOpen((open) => !open);
                    setIsLeftCountryOpen(false);
                  }}
                  className="flex h-[45px] w-full cursor-pointer items-center justify-between rounded-full border border-[#E3DBD8] bg-white px-[14px] text-left text-[11px] outline-none"
                >
                  <span
                    className={
                      isRightCountryOpen
                        ? "text-[#BABABA]"
                        : selectedRightCountry
                          ? "text-[#000000]"
                          : "text-[#BABABA]"
                    }
                  >
                    {isRightCountryOpen
                      ? "-Select Option-"
                      : selectedRightCountry || "Select Country"}
                  </span>
                  <span
                    className={`mr-1 border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-[#E3DBD8] transition ${
                      isRightCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isRightCountryOpen ? (
                  <div className="absolute left-0 top-[44px] z-30 w-full overflow-hidden rounded-[6px] bg-white py-[8px] text-[#000000]">
                    {countryOptions.map((country) => (
                      <button
                        key={`right-${country}`}
                        type="button"
                        onClick={() => {
                          setSelectedRightCountry(country);
                          setIsRightCountryOpen(false);
                        }}
                        disabled={selectedLeftCountry === country}
                        className={`block w-full px-[22px] py-[8px] text-left text-[11px] leading-[1.6] transition ${
                          selectedLeftCountry === country
                            ? "cursor-not-allowed text-[#bfbfbf]"
                            : "cursor-pointer hover:bg-[#f6f6f6]"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full flex flex-col gap-[10px] sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="h-[38px] w-full rounded-full border border-white bg-transparent px-[14px] text-[11px] text-white outline-none placeholder:text-white sm:w-[300px]"
                />
                <button
                  type="button"
                  className="h-[38px] w-[98px] rounded-full bg-white px-[10px] text-[11px] font-semibold text-[#034833] cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/whiteplane.svg"
            alt="Plane and travel documents graphic"
            className="w-[200px] object-contain sm:w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SecondPart;
