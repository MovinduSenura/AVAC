import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import TestimonialAvatar from "./TestimonialAvatar";

const testimonialCards = [
  {
    name: "Albert Flores",
    role: "Medical Assistant",
    tinted: false,
  },
  {
    name: "Eleanor Pena",
    role: "Dog Trainer",
    tinted: true,
  },
  {
    name: "Ronald Richards",
    role: "President of Sales",
    tinted: true,
  },
  {
    name: "Savannah Nguyen",
    role: "Marketing Coordinator",
    tinted: false,
  },
  {
    name: "Jerome Bell",
    role: "Web Designer",
    tinted: false,
  },
  {
    name: "Annette Black",
    role: "Nursing Assistant",
    tinted: true,
  },
];

const quoteCopy =
  "We have been operating for over an go providin top-notch services to our is a clients and build strong track record in the industry.We have been operating in for over a decad providi ina";

const testimonialsPerPage = 4;

function BlogThirdPart({ postedTestimonials = [], currentPage = 1, onPageChange }) {
  const sectionRef = useRef(null);
  const latestCardRef = useRef(null);
  const { hash, key } = useLocation();
  const latestTestimonialId = postedTestimonials[0]?.id;
  const cards = [...postedTestimonials, ...testimonialCards];
  const totalPages = Math.ceil(cards.length / testimonialsPerPage);
  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const firstCardIndex = (activePage - 1) * testimonialsPerPage;
  const visibleCards = cards.slice(firstCardIndex, firstCardIndex + testimonialsPerPage);

  function changePage(page) {
    if (page < 1 || page > totalPages || page === activePage) return;
    onPageChange(page);
    sectionRef.current?.scrollIntoView({ block: "start" });
  }

  useEffect(() => {
    if (latestTestimonialId) {
      latestCardRef.current?.scrollIntoView({ block: "center" });
      latestCardRef.current?.focus({ preventScroll: true });
    }
  }, [latestTestimonialId]);

  useEffect(() => {
    if (hash === "#testimonials") {
      sectionRef.current?.scrollIntoView({ block: "start" });
    }
  }, [hash, key]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-white px-4 pb-[74px] pt-[16px] text-black sm:px-8 sm:pb-[102px] sm:pt-[68px]"
    >
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <h2 className="text-[34px] font-bold leading-[1.06] text-[color:var(--avac-gold)]">
            Escape To Extraordinary
            <span className="block">Where Every Journey</span>
          </h2>
        </div>

        <div
          id="testimonial-list"
          className="mt-[36px] grid gap-[18px] sm:mt-[42px] sm:grid-cols-2 sm:gap-[22px]"
        >
          {visibleCards.map((card) => (
            <article
              key={card.id || card.name}
              ref={card.id && card.id === latestTestimonialId ? latestCardRef : null}
              tabIndex={-1}
              className={`min-w-0 break-words rounded-[14px] px-[22px] pb-[24px] pt-[20px] shadow-[0_16px_42px_rgba(61,47,11,0.06)] focus-visible:outline-2 focus-visible:outline-[color:var(--avac-gold)] sm:rounded-[16px] sm:px-[38px] sm:pb-[40px] sm:pt-[38px] ${
                card.tinted ? "bg-[#F1F5EB]" : "bg-white"
              }`}
            >
              <img
                src="/idea.png"
                alt=""
                aria-hidden="true"
                className="h-[18px] w-[28px] object-contain sm:h-[50px] sm:w-[62px]"
              />

              <p className="mt-[10px] max-w-[480px] whitespace-pre-line text-[18px] leading-[1.9] text-[#727272] sm:text-[19px]">
                {card.story ?? quoteCopy}
              </p>

              <div className="mt-[22px] flex items-center gap-[14px]">
                <TestimonialAvatar src={card.photo} name={card.name} />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[color:var(--avac-gold)] sm:text-[14px]">
                    {card.name}
                  </p>
                  <p className="mt-[2px] text-[11px] text-[#b38943]">
                    {card.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <nav
          aria-label="Testimonial pages"
          className="mt-[60px] flex flex-wrap items-center justify-center gap-[10px]"
        >
          {activePage > 1 && (
            <button
              type="button"
              onClick={() => changePage(activePage - 1)}
              aria-label="Previous testimonial page"
              aria-controls="testimonial-list"
              className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)]"
            >
              <img
                src="/brownArrow.png"
                alt=""
                aria-hidden="true"
                className="h-[12px] w-[12px] rotate-180 object-contain"
              />
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-label={`Go to testimonial page ${page}`}
                aria-current={page === activePage ? "page" : undefined}
                aria-controls="testimonial-list"
                className={`flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)] ${
                  page === activePage
                    ? "border-[color:var(--avac-gold)] text-[color:var(--avac-gold)]"
                    : "border-[#E3DBD8] text-[#734611]"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => changePage(activePage + 1)}
            disabled={activePage === totalPages}
            aria-label="Next testimonial page"
            aria-controls="testimonial-list"
            className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <img
              src="/brownArrow.png"
              alt=""
              aria-hidden="true"
              className="h-[12px] w-[12px] object-contain"
            />
          </button>
        </nav>
      </div>
    </section>
  );
}

export default BlogThirdPart;
