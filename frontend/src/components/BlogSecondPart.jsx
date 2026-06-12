const articles = [
  {
    title: "Wonders of Ancient Civilizations A Journey Through Egypt",
  },
  {
    title: "The Road to Adventure Embarking on New Horizons",
  },
];

const postMeta = {
  author: "By admin",
  date: "October 19, 2022",
  comments: "Comments (05)",
};

const popularPosts = [
  "Find Your Adventure Live Your Passion",
  "Travel Beyond Your Imagination",
  "Adventure Awaits Around Every Corner",
];

const categories = [
  "Flight Booking",
  "Vacation Packages",
  "Car Rental Services",
  "Adventure Travel Planning",
  "Group Travel Organization",
  "Insurance Services",
];

const tags = [
  "Travel Planning",
  "Safety Guides",
  "Spa Retreats",
  "Wine Tours",
  "Travel Pack",
  "Solo Travel",
  "Travel Programs",
];

const excerpt =
  "Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis viverra laoreet augue mattis fermentum ullamcorper viverra laoreet Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis viverra laoreet augue mattis fermentum ullamcorper viverra laoreet Aliquam eros justo, posuere loborti";

function SidebarCard({ title, children }) {
  return (
    <div className="rounded-[16px] bg-white px-[20px] py-[22px] shadow-[0_18px_40px_rgba(70,54,17,0.05)]">
      <h3 className="text-[18px] font-bold tracking-[-0.02em] text-[color:var(--avac-gold)]">
        {title}
      </h3>
      <div className="mt-[14px] border-t border-[#E3DBD8] pt-[16px]">
        {children}
      </div>
    </div>
  );
}

function BlogSecondPart() {
  return (
    <section className="bg-white px-4 pb-[78px] pt-[42px] text-black sm:px-8 sm:pb-[100px] sm:pt-[62px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="grid gap-[32px] sm:grid-cols-[1.55fr_0.75fr] sm:items-start sm:gap-[28px]">
          <div>
            <div className="space-y-[50px]">
              {articles.map((article) => (
                <article key={article.title}>
                  <div className="h-[220px] rounded-[10px] bg-[#D9D9D9] sm:h-[312px]" />

                  <div className="mt-[12px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[12px] text-[#111214]">
                    <span className="flex items-center gap-[5px]">
                      <img
                        src="/blogUser.png"
                        alt=""
                        aria-hidden="true"
                        className="h-[11px] w-[11px] object-contain"
                      />
                      <span>{postMeta.author}</span>
                    </span>
                    <span className="flex items-center gap-[3px]">
                      <img
                        src="/blogCalender.png"
                        alt=""
                        aria-hidden="true"
                        className="h-[11px] w-[11px] object-contain"
                      />
                      <span>{postMeta.date}</span>
                    </span>
                    <span className="flex items-center gap-[3px]">
                      <img
                        src="/blogComments.png"
                        alt=""
                        aria-hidden="true"
                        className="h-[14px] w-[14px] object-contain"
                      />
                      <span>{postMeta.comments}</span>
                    </span>
                  </div>

                  <h2 className="mt-[14px] max-w-[600px] text-[34px] font-bold leading-[1.06] text-[#000000]">
                    {article.title}
                  </h2>

                  <p className="mt-[14px] max-w-[640px] text-[12px] leading-[1.9] text-[#727272]">
                    {excerpt}
                  </p>

                  <button
                    type="button"
                    className="mt-[18px] inline-flex h-[45px] items-center justify-center gap-[10px] rounded-full bg-[color:var(--avac-gold)] px-[22px] text-[12px] font-medium text-white cursor-pointer"
                  >
                    <span>Learn More</span>
                    <img
                      src="/smallArrow.png"
                      alt=""
                      aria-hidden="true"
                      className="mt-[2px] h-[9px] w-[10px] object-contain"
                    />
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-[60px] flex items-center justify-center gap-[10px]">
              <button
                type="button"
                className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[color:var(--avac-gold)] text-[13px] font-semibold text-[color:var(--avac-gold)]"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8] text-[13px] font-semibold text-[#734611]"
              >
                2
              </button>
              <button
                type="button"
                className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8] text-[13px] font-semibold text-[#734611]"
              >
                3
              </button>
              <button
                type="button"
                className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8]"
              >
                <img
                  src="/brownArrow.png"
                  alt="Next page"
                  className="h-[12px] w-[12px] object-contain"
                />
              </button>
            </div>
          </div>

          <aside className="space-y-[18px]">
            <SidebarCard title="Search Here">
              <div className="flex h-[42px] items-center rounded-full border border-[#E3DBD8] bg-white pl-[16px] pr-[12px]">
                <input
                  type="text"
                  placeholder="Search.."
                  className="flex-1 border-0 bg-transparent text-[12px] text-[#000000] outline-none placeholder:text-[#727272]"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
                >
                  <img
                    src="/searchIcon.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-[16px] w-[16px] object-contain"
                  />
                </button>
              </div>
            </SidebarCard>

            <SidebarCard title="Popular Post">
              <div className="space-y-[12px]">
                {popularPosts.map((post) => (
                  <div key={post} className="flex gap-[12px]">
                    <div className="h-[59px] w-[59px] rounded-[12px] bg-[#D9D9D9]" />
                    <div>
                      <div className="flex items-center gap-[4px] text-[12px] text-[#727272]">
                        <img
                          src="/greenCalender.png"
                          alt=""
                          aria-hidden="true"
                          className="h-[12px] w-[12px] object-contain"
                        />
                        <span>October 19, 2022</span>
                      </div>
                      <p className="mt-[4px] max-w-[160px] text-[13px] leading-[1.45] font-semibold text-[color:var(--avac-gold)]">
                        {post}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard title="Category">
              <div className="space-y-[10px] text-[12px] text-[color:var(--avac-gold)]">
                {categories.map((category) => (
                  <p key={category}>{category}</p>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard title="Popular Tags">
              <div className="flex flex-wrap gap-[8px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#E3DBD8] px-[10px] py-[6px] text-[12px] text-[#727272]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default BlogSecondPart;
