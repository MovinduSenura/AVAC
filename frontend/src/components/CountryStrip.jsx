const countries = [
  { name: "Poland", code: "pl" },
  { name: "Latvia", code: "lv" },
  { name: "Lithuania", code: "lt" },
  { name: "Czech Republic", code: "cz" },
  { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" },
  { name: "Hungary", code: "hu" },
  { name: "Serbia", code: "rs" },
];

function CountryStrip() {
  return (
    <div className="mx-auto grid w-fit grid-cols-[repeat(4,48px)] items-center justify-items-center gap-x-[24px] gap-y-3 transition-[column-gap] duration-300 ease-out group-hover:gap-x-[28px] motion-reduce:transition-none sm:grid-cols-[repeat(8,48px)] sm:gap-x-[20px] sm:group-hover:gap-x-[24px] lg:gap-x-[85px] lg:group-hover:gap-x-[100px]">
      {countries.map((country) => (
        <img
          key={country.code}
          src={`/flags/${country.code}.png`}
          alt={`${country.name} flag`}
          title={country.name}
          width={48}
          height={32}
          className="h-[32px] w-[48px] object-fill"
        />
      ))}
    </div>
  );
}

export default CountryStrip;
