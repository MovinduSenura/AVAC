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
    <div
      role="region"
      aria-label="Destination countries"
      className="mx-auto w-full overflow-hidden sm:w-fit sm:overflow-visible"
    >
      <div className="flex w-max animate-[avac-country-roll_20s_linear_infinite] sm:animate-none motion-reduce:animate-none">
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 ? true : undefined}
            className={`flex shrink-0 items-center gap-x-[24px] pr-[24px] ${
              copy > 0
                ? "sm:hidden"
                : "sm:grid sm:grid-cols-[repeat(8,48px)] sm:justify-items-center sm:gap-x-[20px] sm:pr-0 sm:transition-[column-gap] sm:duration-300 sm:ease-out sm:group-hover:gap-x-[24px] motion-reduce:transition-none lg:gap-x-[85px] lg:group-hover:gap-x-[100px]"
            }`}
          >
            {countries.map((country) => (
              <img
                key={country.code}
                src={`/flags/${country.code}.png`}
                alt={copy === 0 ? `${country.name} flag` : ""}
                title={country.name}
                width={48}
                height={32}
                draggable={false}
                className="h-[32px] w-[48px] shrink-0 object-fill"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryStrip;
