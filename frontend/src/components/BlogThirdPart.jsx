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

function BlogThirdPart() {
  return (
    <section className="bg-white px-4 pb-[74px] pt-[46px] text-black sm:px-8 sm:pb-[102px] sm:pt-[68px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <h2 className="text-[34px] font-bold leading-[1.06] text-[color:var(--avac-gold)]">
            Escape to Extraordinary
            <span className="block">Where Every Journey</span>
          </h2>
        </div>

        <div className="mt-[36px] grid gap-[18px] sm:mt-[42px] sm:grid-cols-2 sm:gap-[22px]">
          {testimonialCards.map((card) => (
            <article
              key={card.name}
              className={`rounded-[14px] px-[22px] pb-[24px] pt-[20px] shadow-[0_16px_42px_rgba(61,47,11,0.06)] sm:rounded-[16px] sm:px-[38px] sm:pb-[40px] sm:pt-[38px] ${
                card.tinted ? "bg-[#F1F5EB]" : "bg-white"
              }`}
            >
              <img
                src="/idea.png"
                alt=""
                aria-hidden="true"
                className="h-[18px] w-[28px] object-contain sm:h-[50px] sm:w-[62px]"
              />

              <p className="mt-[10px] max-w-[480px] text-[18px] leading-[1.9] text-[#727272] sm:text-[19px]">
                {quoteCopy}
              </p>

              <div className="mt-[22px] flex items-center gap-[14px]">
                <span className="h-[48px] w-[48px] rounded-full bg-[#D9D9D9]" />
                <div>
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

        <div className="mt-[60px] flex items-center justify-center gap-[10px]">
          <button
            type="button"
            className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px] border border-[color:var(--avac-gold)] text-[13px] font-semibold text-[color:var(--avac-gold)]"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px] border border-[#E3DBD8] text-[13px] font-semibold text-[#734611]"
          >
            2
          </button>
          <button
            type="button"
            className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px] border border-[#E3DBD8] text-[13px] font-semibold text-[#734611]"
          >
            3
          </button>
          <button
            type="button"
            className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px] border border-[#E3DBD8]"
          >
            <img
              src="/brownArrow.png"
              alt="Next page"
              className="h-[12px] w-[12px] object-contain"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogThirdPart;
