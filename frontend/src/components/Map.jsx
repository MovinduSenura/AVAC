const locationQuery = encodeURIComponent(
  "No. 80/21 Roseville Place, Dalugama, Kelaniya, Sri Lanka"
);

function Map() {
  return (
    <section className="bg-white pt-[8px]">
      <div className="mx-auto max-w-full overflow-hidden">
        <iframe
          title="AVA Consultants location map"
          src={`https://www.google.com/maps?q=${locationQuery}&z=16&output=embed`}
          className="h-[220px] w-full border-0 sm:h-[280px] lg:h-[380px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

export default Map;
