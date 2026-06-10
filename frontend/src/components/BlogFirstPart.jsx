import { Link } from "react-router-dom";

function BlogFirstPart() {
  return (
    <section className="bg-white px-4 pb-[22px] pt-[26px] sm:px-6 sm:pb-[26px] sm:pt-[30px] lg:px-8 lg:pb-[30px] lg:pt-[34px]">
      <div className="mx-auto max-w-[1450px] rounded-[22px] bg-[color:var(--avac-gold)] px-[26px] py-[36px] sm:px-[48px] sm:py-[44px] lg:min-h-[180px] lg:rounded-[26px] lg:px-[112px] lg:py-[82px]">
        <div className="flex h-full flex-col justify-center">
          <h1 className="text-[36px] font-bold leading-[1.06] text-white sm:text-[44px] lg:text-[34px]">
            Blog & Success Story
          </h1>

          <div className="mt-[12px] inline-flex items-center gap-[8px] text-[12px] leading-none font-medium text-white/95">
            <Link to="/" className="block transition-opacity hover:opacity-80">
              Home
            </Link>
            <img
              src="/whiteArrowHead.png"
              alt=""
              aria-hidden="true"
              className="mt-[4px] h-[8px] w-[5px] object-contain"
            />
            <span className="block">Success Story</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogFirstPart;
