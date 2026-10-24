function BlogFourthPart() {
  return (
    <section
      aria-labelledby="success-story-heading"
      className="bg-white px-4 pb-[74px] text-black sm:px-8 sm:pb-[102px]"
    >
      <div className="mx-auto max-w-[1000px] rounded-[20px] bg-[#F1F5EB] px-[22px] py-[32px] sm:px-[42px] sm:py-[42px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Share your testimonial
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>
        <h2
          id="success-story-heading"
          className="mt-[12px] text-[34px] font-bold leading-[1.15] text-[color:var(--avac-gold)]"
        >
          What Is Your Success Story?
        </h2>
        <p
          id="success-story-description"
          className="mt-[14px] text-[14px] leading-[1.8] text-[#727272]"
        >
          Tell us about your experience with AVA Consultants and the milestones
          you have achieved.
        </p>
        <div className="mt-[24px] grid gap-[18px] sm:grid-cols-2">
          <div>
            <label
              htmlFor="testimonial-name"
              className="block text-[14px] font-medium text-[color:var(--avac-gold)]"
            >
              Name
            </label>
            <input
              id="testimonial-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              className="mt-[8px] block w-full rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[14px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]"
            />
          </div>
          <div>
            <label
              htmlFor="testimonial-occupation"
              className="block text-[14px] font-medium text-[color:var(--avac-gold)]"
            >
              Occupation
            </label>
            <input
              id="testimonial-occupation"
              name="occupation"
              type="text"
              autoComplete="organization-title"
              placeholder="Enter your occupation"
              className="mt-[8px] block w-full rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[14px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]"
            />
          </div>
        </div>
        <textarea
          id="success-story"
          name="successStory"
          aria-labelledby="success-story-heading"
          aria-describedby="success-story-description"
          rows={6}
          placeholder="Share your success story here..."
          className="mt-[24px] block min-h-[180px] w-full resize-y rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[16px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]"
        />
        <button
          type="button"
          className="mt-[20px] inline-flex min-h-[45px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-full bg-[color:var(--avac-gold)] px-[28px] py-[12px] text-[14px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--avac-gold)] sm:w-auto"
        >
          <span>Post</span>
          {/* <img
            src="/smallArrow.png"
            alt=""
            aria-hidden="true"
            className="h-[9px] w-[10px] object-contain"
          /> */}
        </button>
      </div>
    </section>
  );
}

export default BlogFourthPart;
