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

function SecondPart() {
  const [isLeftCountryOpen, setIsLeftCountryOpen] = useState(false);
  const [isRightCountryOpen, setIsRightCountryOpen] = useState(false);
  const [selectedLeftCountry, setSelectedLeftCountry] = useState("");
  const [selectedRightCountry, setSelectedRightCountry] = useState("");
  const leftCountryRef = useRef(null);
  const rightCountryRef = useRef(null);

  const countryOptions = countryGroups.map((country) =>
    country.replace(/^[a-z]\.\s*/i, "")
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
        {/* ABOUT US */}
      <div className="grid items-center grid-cols-[525px_1fr]">
        <div className="overflow-hidden">
          <img
            src="/abtusimage.png"
            alt="Visa stamping, skyline and currency collage"
            className="h-[500px] object-cover"
          />
        </div>

        <article>
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
          <h2 className="mt-[10px] max-w-[420px] text-[38px] font-bold leading-[1.06] text-[#16171A]">
            We Provide The Best
            <span className="block text-[color:var(--avac-gold)]">
              Service For Consulting
            </span>
          </h2>
          <p className="mt-[14px] max-w-[470px] text-[13px] leading-[1.8] text-[#000000]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <br />Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
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
            className="mt-[30px] inline-flex h-[50px] items-center justify-center gap-[10px] rounded-full bg-[color:var(--avac-gold)] px-[28px] text-[11px] font-semibold text-white cursor-pointer"
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

         {/* OUR SERVICES */}
      <div className="mt-[20px] grid grid-cols-[50%_50.5%] rounded-[40px] bg-[#F1F5EB]">
        <div className="px-[50px] pb-[54px] pt-[62px] text-black">
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

          <h3 className="mt-[18px] max-w-[420px] text-[38px] font-bold leading-[1.06] text-[#16171A]">
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
            className="h-full w-full rounded-[40px]"
          />
        </div>
      </div>

      {/*  Are you ready to fly? */}
      <div className="mt-[100px] rounded-[12px] bg-[color:var(--avac-gold)] text-white flex min-h-[330px] items-center justify-between px-[50px]">
        <div className="relative max-w-[560px]">
          <img
            src="/map.png"
            alt=""
            className="pointer-events-none absolute left-[30px] top-[40px] w-[460px] opacity-[1] mix-blend-screen"
          />
          <div className="relative z-10">
            <h3 className="text-[38px] font-bold leading-[1.06]">
              Are you ready to fly?
            </h3>
            <p className="mt-[10px] text-[14px] font-bold text-[#000000]">
               Preferred Job & Countries in Europe (Choose 2)
            </p>
            <div className="mt-[5px] max-w-[620px] text-[14px] leading-[1.9] text-[#000000]">
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

            <form className="relative z-10 mt-[16px] grid w-[640px] max-w-full grid-cols-[250px_250px] gap-y-[20px] gap-x-[0px]">
              <div ref={leftCountryRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsLeftCountryOpen((open) => !open);
                    setIsRightCountryOpen(false);
                  }}
                  className="flex h-[45px] w-[230px] items-center justify-between rounded-full border border-[#E3DBD8] bg-white px-[14px] text-left text-[11px] outline-none cursor-pointer"
                >
                  <span className={isLeftCountryOpen ? "text-[#BABABA]" : selectedLeftCountry ? "text-[#000000]" : "text-[#BABABA]"}>
                    {isLeftCountryOpen ? "-Select Option-" : selectedLeftCountry || "Select Country"}
                  </span>
                  <span
                    className={`border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-[#E3DBD8] mr-1 transition ${
                      isLeftCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLeftCountryOpen ? (
                  <div className="absolute left-0 top-[44px] z-30 w-[230px] overflow-hidden rounded-[6px] bg-white py-[8px] text-[#000000]">
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
              <div ref={rightCountryRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsRightCountryOpen((open) => !open);
                    setIsLeftCountryOpen(false);
                  }}
                  className="flex h-[45px] w-[230px] items-center justify-between rounded-full border border-[#E3DBD8] bg-white px-[14px] text-left text-[11px] outline-none cursor-pointer"
                >
                  <span className={isRightCountryOpen ? "text-[#BABABA]" : selectedRightCountry ? "text-[#000000]" : "text-[#BABABA]"}>
                    {isRightCountryOpen ? "-Select Option-" : selectedRightCountry || "Select Country"}
                  </span>
                  <span
                    className={`border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-[#E3DBD8] mr-1 transition ${
                      isRightCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isRightCountryOpen ? (
                  <div className="absolute left-0 top-[44px] z-30 w-[230px] overflow-hidden rounded-[6px] bg-white py-[8px] text-[#000000]">
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
              <div className="col-span-2 flex items-center gap-[10px]">
              <input
                type="email"
                placeholder="Enter Email"
                className="h-[38px] w-[300px] rounded-full border border-white bg-transparent px-[14px] text-[11px] text-white outline-none placeholder:text-white"
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

        <div className="mt-[0px] flex justify-center">
          <img
            src="/whiteplane.svg"
            alt="Plane and travel documents graphic"
            className="w-[300px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default SecondPart;
