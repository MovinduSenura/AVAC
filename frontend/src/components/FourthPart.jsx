import { useEffect, useRef, useState } from "react";

const countries = [
  "Poland",
  "Latvia",
  "Lithuania",
  "Czech Republic",
  "Slovakia",
  "Slovenia",
  "Hungary",
  "Serbia",
];

const jobs = [
  "Truck Driver",
  "Bus Driver",
  "Factory Worker",
  "Construction Worker",
  "Welder",
  "Plumer",
];

function FieldLabel({ children }) {
  return (
    <span className="mb-[8px] block text-[12px] font-medium text-[#3d3d3d]">
      {children}
    </span>
  );
}

function InputShell({ children, icon, textarea = false }) {
  return (
    <div className="relative">
      {children}
      <img
        src={icon}
        alt=""
        className={`pointer-events-none absolute right-[18px] ${
          textarea ? "top-[18px]" : "top-1/2 -translate-y-1/2"
        } h-[14px] w-[14px] object-contain opacity-90`}
      />
    </div>
  );
}

function FourthPart() {
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const jobDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      const target = event.target;
      const clickedInsideJob = jobDropdownRef.current?.contains(target);
      const clickedInsideCountry = countryDropdownRef.current?.contains(target);

      if (!clickedInsideJob && !clickedInsideCountry) {
        setIsJobOpen(false);
        setIsCountryOpen(false);
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
    <div className="mx-auto grid max-w-[1000px] gap-[34px] sm:grid-cols-[0.9fr_1fr] sm:items-center">
      <div className="order-2 flex justify-center sm:order-1 sm:justify-start sm:pl-[10px]">
        <img
          src="/contactInfoMan.png"
          alt="Traveler illustration with map markers and documents"
          className="w-full max-w-[520px] object-contain"
        />
      </div>

      <div className="order-1 mx-auto w-full max-w-[640px] sm:order-2">
        <div className="flex items-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Contact Information
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>

        <h2 className="mt-[8px] max-w-[420px] text-[34px] font-bold leading-[1.06] text-[color:var(--avac-gold)] sm:text-[38px]">
          Let Your Wanderlust
          <span className="block">Guide You</span>
        </h2>

        <form className="mt-[20px] rounded-[18px] bg-white px-[18px] pb-[24px] pt-[20px] shadow-[0_18px_60px_rgba(51,45,18,0.08)] sm:mt-[18px] sm:rounded-[20px] sm:px-[20px] sm:pb-[24px] sm:pt-[22px]">
          <div className="grid gap-x-[18px] gap-y-[14px] sm:grid-cols-2">
            <label className="block">
              <FieldLabel>Your Email</FieldLabel>
              <InputShell icon="/contactRocket.png">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
                />
              </InputShell>
            </label>

            <label className="block">
              <FieldLabel>Your Phone</FieldLabel>
              <InputShell icon="/contactPhone.png">
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
                />
              </InputShell>
            </label>

            <label className="block">
              <FieldLabel>Select a Job</FieldLabel>
              <div ref={jobDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsJobOpen((open) => !open);
                    setIsCountryOpen(false);
                  }}
                  className="flex h-[48px] w-full cursor-pointer items-center justify-between rounded-full border border-[#E3DBD8] bg-white px-[16px] text-left text-[12px] outline-none"
                >
                  <span
                    className={
                      isJobOpen
                        ? "text-[#BABABA]"
                        : selectedJob
                          ? "text-[#000000]"
                          : "text-[#BABABA]"
                    }
                  >
                    {isJobOpen ? "-Select Option-" : selectedJob || "Select a Job"}
                  </span>
                  <span
                    className={`mr-1 border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-[#E3DBD8] transition ${
                      isJobOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isJobOpen ? (
                  <div className="absolute left-0 top-[47px] z-30 w-full overflow-hidden rounded-[6px] bg-white py-[8px] text-[#000000] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    {jobs.map((job) => (
                      <button
                        key={job}
                        type="button"
                        onClick={() => {
                          setSelectedJob(job);
                          setIsJobOpen(false);
                        }}
                        className="block w-full cursor-pointer px-[22px] py-[8px] text-left text-[11px] leading-[1.6] transition hover:bg-[#f6f6f6]"
                      >
                        {job}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </label>

            <label className="block">
              <FieldLabel>Select Country</FieldLabel>
              <div ref={countryDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsCountryOpen((open) => !open);
                    setIsJobOpen(false);
                  }}
                  className="flex h-[48px] w-full cursor-pointer items-center justify-between rounded-full border border-[#E3DBD8] bg-white px-[16px] text-left text-[12px] outline-none"
                >
                  <span
                    className={
                      isCountryOpen
                        ? "text-[#BABABA]"
                        : selectedCountry
                          ? "text-[#000000]"
                          : "text-[#BABABA]"
                    }
                  >
                    {isCountryOpen
                      ? "-Select Option-"
                      : selectedCountry || "Select Country"}
                  </span>
                  <span
                    className={`mr-1 border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-[#E3DBD8] transition ${
                      isCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCountryOpen ? (
                  <div className="absolute left-0 top-[47px] z-30 w-full overflow-hidden rounded-[6px] bg-white py-[8px] text-[#000000] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                        }}
                        className="block w-full cursor-pointer px-[22px] py-[8px] text-left text-[11px] leading-[1.6] transition hover:bg-[#f6f6f6]"
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </label>
          </div>

          <label className="mt-[14px] block">
            <FieldLabel>Your Address</FieldLabel>
            <InputShell icon="/contactLocation.png">
              <input
                type="text"
                placeholder="Your Address"
                className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
              />
            </InputShell>
          </label>

          <label className="mt-[14px] block">
            <FieldLabel>Message</FieldLabel>
            <InputShell icon="/contactMail.png" textarea>
              <textarea
                placeholder="Write Message.."
                rows="5"
                className="min-h-[108px] w-full resize-none rounded-[18px] border border-[#ebe4dc] bg-white px-[16px] py-[14px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
              />
            </InputShell>
          </label>

          <button
            type="submit"
            className="mx-auto mt-[20px] flex h-[52px] w-full max-w-[170px] cursor-pointer items-center justify-center rounded-full bg-[color:var(--avac-gold)] px-[24px] text-[11px] font-semibold text-white transition hover:brightness-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default FourthPart;
