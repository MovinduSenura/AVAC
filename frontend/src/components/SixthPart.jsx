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
      <div className="flex items-end justify-between">
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
          <h2 className="mt-[9px] text-[38px] font-bold leading-[1.06] text-[color:var(--avac-gold)]">
            Adventure Awaits Around
            <span className="block">Every Corner</span>
          </h2>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#110C04] text-[18px] text-[color:var(--avac-gold)] cursor-pointer"
          >
            <img
              src="/arrow-left.png"
              alt=""
              className="block h-[10px] w-[12px] object-contain"
            />
          </button>
          <button
            type="button"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[color:var(--avac-gold)] text-[18px] text-white cursor-pointer"
          >
            <img
              src="/arrow-right.png"
              alt=""
              className="block h-[10px] w-[12px] object-contain"
            />
          </button>
        </div>
      </div>

      <div className="mt-[40px] grid gap-[20px] grid-cols-3">
        {packages.map((item) => (
          <article
            key={item.title}
            className="rounded-[18px] bg-white px-[15px] pb-[28px] pt-[14px] text-black"
          >
            <div className="h-[222px] rounded-[15px] bg-[#d9d9d9]" />

            <div className="mt-[18px] flex flex-wrap items-center justify-between gap-y-[8px] text-[11px] text-[#000000] px-3">
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

            <h3 className="mt-[10px] min-h-[82px] max-w-[240px] text-[17px] font-bold leading-[1.35] text-[color:var(--avac-gold)] px-3">
              {item.title}
            </h3>
            <div className="px-3">
              <button
                type="button"
                className={`mt-[22px] inline-flex h-[45px] items-center justify-center gap-[10px] rounded-full px-[22px] text-[12px] font-medium cursor-pointer ${
                  item.filled
                    ? "bg-[color:var(--avac-gold)] text-white"
                    : "border border-[color:var(--avac-gold)] text-[color:var(--avac-gold)]"
                }`}
              >
                <span>{item.cta}</span>
                <img
                  src={item.filled ? "/smallArrow.png" : "/smallGoldArrow.png"}
                  alt=""
                  className="h-[10px] w-[12px] object-contain"
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
