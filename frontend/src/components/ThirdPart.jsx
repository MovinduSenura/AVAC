import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestimonialAvatar from "./TestimonialAvatar";
import { fetchApprovedTestimonials } from "../lib/publicApi";

function ThirdPart() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isActive = true;
    fetchApprovedTestimonials().then((rows) => {
      if (isActive && rows) setTestimonials(rows);
    });
    return () => {
      isActive = false;
    };
  }, []);

  // Until testimonials are approved in the admin panel, the sample quote is shown.
  const active = testimonials[activeIndex % Math.max(testimonials.length, 1)];

  function showTestimonial(step) {
    if (testimonials.length < 2) return;
    setActiveIndex((index) => (index + step + testimonials.length) % testimonials.length);
  }

  return (
    <div className="mx-auto max-w-[1000px]">
      {/* <div className="flex items-center justify-center gap-[10px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
          Client Testimonials
        </p>
        <img
          src="/paperRocket.svg"
          alt=""
          className="h-[12px] w-[18px] object-contain"
        />
      </div> */}
      <div className="text-center">
        <h2 className="mt-[12px] text-[34px] font-bold leading-[1.06] sm:text-[38px]">
          <span className="text-[color:var(--avac-gold)]">
            Client Testimonials
          </span>
          {/* <span className="block text-[color:var(--avac-gold)]">
            Where Every Journey
          </span> */}
        </h2>
      </div>

      <div className="mt-[48px] flex flex-col gap-[24px] sm:mt-[72px] sm:min-h-[430px] sm:flex-row sm:items-start sm:justify-center sm:gap-[0px]">
        <article className="relative z-10 w-full max-w-[550px] overflow-hidden rounded-[20px] bg-white px-[24px] pb-[30px] pt-[28px] text-black sm:mt-[92px] sm:-mr-[60px] sm:px-[50px] sm:pb-[38px] sm:pt-[40px]">
          <div className="relative">
            <img
              src="/testimonialsImg.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[0px] top-[8px] h-[170px] w-[200px] object-contain opacity-20 sm:right-[18px] sm:top-[0px] sm:h-[230px] sm:w-[270px]"
            />
            <p className="relative z-10 max-w-[492px] text-[16px] leading-[30px] text-[color:var(--avac-gold)] sm:text-[20px] sm:leading-[42px]">
              {active ? (
                <span className="whitespace-pre-line">{active.story}</span>
              ) : (
                <>
                  Leverage agile frameworks to provide a{" "}
                  <br className="hidden sm:block" />
                  robust synopsis for strategy foster Leverage{" "}
                  <br className="hidden sm:block" />
                  agile frameworks to provide a robust{" "}
                  <br className="hidden sm:block" />
                  synopsis for go for strategy foster
                </>
              )}
            </p>
          </div>
          <div className="relative z-10 mt-[28px] flex flex-col gap-[18px] sm:mt-[38px] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-[14px]">
              <TestimonialAvatar
                src={active?.photo_url}
                name={active?.name ?? "Eleanor Pena"}
              />
              <div>
                <p className="text-[15px] font-semibold text-[color:var(--avac-gold)]">
                  {active?.name ?? "Eleanor Pena"}
                </p>
                <p className="text-[12px] text-[#727272]">
                  {active?.role ?? "President of Sales"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                onClick={() => showTestimonial(-1)}
                aria-label="Previous testimonial"
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F1F5EB] text-[18px] text-[color:var(--avac-gold)]"
              >
                <img
                  src="/arrow-left.png"
                  alt=""
                  className="block h-[10px] w-[12px] object-contain"
                />
              </button>
              <button
                type="button"
                onClick={() => showTestimonial(1)}
                aria-label="Next testimonial"
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[color:var(--avac-gold)] text-[18px] text-white"
              >
                <img
                  src="/arrow-right.png"
                  alt=""
                  className="block h-[10px] w-[12px] object-contain"
                />
              </button>
            </div>
          </div>
        </article>

        <div className="relative w-full max-w-[540px] overflow-hidden rounded-[20px]">
          <img
            src="/leafLady.png"
            alt="Farmer holding fresh produce"
            className="h-[360px] w-full object-cover sm:h-[520px]"
          />
          <Link
            to="/blog#testimonials"
            className="absolute bottom-[18px] right-[18px] inline-flex h-[50px] cursor-pointer items-center justify-center gap-[10px] rounded-full bg-white px-[25px] text-[11px] font-semibold text-[color:var(--avac-gold)]"
          >
            Read More
            <span className="relative top-[0px] flex h-[14px] w-[14px] items-center justify-center">
              <img
                src="/smallGoldArrow.png"
                alt=""
                className="mt-[2px] block h-[10px] w-[12px] object-contain"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThirdPart;
