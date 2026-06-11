const packages = [
  {
    date: "October 19, 2022",
    author: "By admin",
    title: "Wander Often Wonder Alway Flight Comport",
    cta: "Read More",
    filled: false,
  },
  {
    date: "October 19, 2022",
    author: "By admin",
    title: "Flight Booking and Final Reservations",
    cta: "Read More",
    filled: true,
  },
  {
    date: "October 19, 2022",
    author: "By admin",
    title: "Hotel Accommodation with Booking Always",
    cta: "Read More",
    filled: false,
  },
];

function SixthPart() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex flex-col gap-[20px] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-[10px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
              Blog & Success Story
            </p>
            <img
              src="/paperRocket.svg"
              alt=""
              className="h-[12px] w-[18px] object-contain"
            />
          </div>
          <h2 className="mt-[9px] text-[34px] font-bold leading-[1.06] text-[color:var(--avac-gold)] sm:text-[38px]">
            Adventure Awaits Around
            <span className="block">Every Corner</span>
          </h2>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#110C04] text-[18px] text-[color:var(--avac-gold)]"
          >
            <img
              src="/arrow-left.png"
              alt=""
              className="block h-[10px] w-[12px] object-contain"
            />
          </button>
          <button
            type="button"
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

      <div className="mt-[40px] grid gap-[20px] sm:grid-cols-3">
        {packages.map((item) => (
          <article
            key={item.title}
            className="rounded-[18px] bg-white px-[15px] pb-[28px] pt-[14px] text-black"
          >
            <div className="h-[222px] rounded-[15px] bg-[#d9d9d9]" />

            <div className="mt-[18px] flex flex-wrap items-center justify-between gap-y-[8px] px-3 text-[11px] text-[#000000]">
              <span className="flex items-center gap-[5px]">
                <img
                  src="/blogCalender.png"
                  alt=""
                  className="h-[12px] w-[12px] object-contain"
                />
                <span>{item.date}</span>
              </span>
              <span className="flex items-center gap-[5px]">
                <img
                  src="/blogUser.png"
                  alt=""
                  className="h-[12px] w-[12px] object-contain"
                />
                <span>{item.author}</span>
              </span>
            </div>

            <h3 className="mt-[10px] max-w-[240px] px-3 text-[17px] font-bold leading-[1.35] text-[color:var(--avac-gold)] sm:min-h-[82px]">
              {item.title}
            </h3>
            <div className="px-3">
              <button
                type="button"
                className={`mt-[22px] inline-flex h-[45px] cursor-pointer items-center justify-center gap-[10px] rounded-full px-[22px] text-[12px] font-medium ${
                  item.filled
                    ? "bg-[color:var(--avac-gold)] text-white"
                    : "border border-[color:var(--avac-gold)] text-[color:var(--avac-gold)]"
                }`}
              >
                <span>{item.cta}</span>
                <img
                  src={item.filled ? "/smallArrow.png" : "/smallGoldArrow.png"}
                  alt=""
                  className="mt-[2px] h-[10px] w-[12px] object-contain"
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default SixthPart;
