import React from 'react'

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
    <div className="mx-auto flex max-w-[1290px] flex-wrap items-center justify-center gap-x-[28px] gap-y-2 text-[20px] font-extrabold uppercase tracking-[0.2px] text-black transition-all duration-300 group-hover:gap-x-[60px] group-hover:text-white">
      {countries.map((country) => (
        <span key={country} className="transition-colors duration-300">
          {country}
        </span>
      ))}
    </div>
  );
}

export default CountryStrip
