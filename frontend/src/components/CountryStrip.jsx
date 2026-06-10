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

function CountryStrip() {
  return (
    <div className="mx-auto flex max-w-[1290px] flex-wrap items-center justify-center gap-x-[18px] gap-y-3 text-center text-[14px] font-extrabold uppercase tracking-[0.2px] text-black transition-all duration-300 group-hover:gap-x-[18px] group-hover:text-white sm:gap-x-[24px] sm:text-[16px] sm:group-hover:gap-x-[36px] lg:gap-x-[28px] lg:text-[20px] lg:group-hover:gap-x-[60px]">
      {countries.map((country) => (
        <span key={country} className="transition-colors duration-300">
          {country}
        </span>
      ))}
    </div>
  );
}

export default CountryStrip;
