const carouselItems = [
  {
    label: "Travel Packages",
    icon: "/travelCarousel.png",
    outlined: false,
  },
  {
    label: "Travel Planning",
    icon: "/travelCarousel.png",
    outlined: true,
  },
  {
    label: "Visa Assistance",
    icon: "/visaCarousel.png",
    outlined: false,
  },
  {
    label: "Global Reach Immigration",
    icon: "/globalReachImmigrationCarousel.png",
    outlined: true,
  },
  {
    label: "CyberLink",
    icon: "/cyberLinkCarousel.png",
    outlined: false,
  },
];

function CarouselItem({ label, icon, outlined }) {
  return (
    <span className="flex items-center gap-[18px] whitespace-nowrap sm:gap-[24px] lg:gap-[32px]">
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="h-[34px] w-[34px] object-contain sm:h-[40px] sm:w-[40px] lg:h-[48px] lg:w-[48px]"
      />
      <span
        className={`text-[24px] font-bold tracking-[0.04em] sm:text-[28px] lg:text-[35px] ${
          outlined ? "" : "text-white"
        }`}
        style={
          outlined
            ? {
                color: "transparent",
                WebkitTextStroke: "0.5px #ffffff",
              }
            : undefined
        }
      >
        {label}
      </span>
    </span>
  );
}

function SeventhPart() {
  return (
    <div className="marquee-track flex min-w-max items-center gap-[18px] px-[14px] sm:gap-[24px] sm:px-[16px] lg:gap-[32px] lg:px-[18px]">
      {carouselItems.map((item) => (
        <CarouselItem key={item.label} {...item} />
      ))}
      {carouselItems.map((item) => (
        <CarouselItem key={`${item.label}-repeat`} {...item} />
      ))}
    </div>
  );
}

export default SeventhPart;
