import { useEffect, useRef, useState } from "react";
import BlogComments from "./BlogComments";
import {
  fetchApprovedComments,
  fetchPublishedPosts,
  formatPostDate,
} from "../lib/publicApi";

// Sample content, shown until posts are published from the admin panel.
const sampleArticles = [
  {
    id: "egypt",
    title: "Wonders of Ancient Civilizations A Journey Through Egypt",
  },
  {
    id: "new-horizons",
    title: "The Road to Adventure Embarking on New Horizons",
  },
];

const postMeta = {
  author: "By admin",
  date: "October 19, 2022",
};

const samplePopularPosts = [
  "Find Your Adventure Live Your Passion",
  "Travel Beyond Your Imagination",
  "Adventure Awaits Around Every Corner",
];

const sampleCategories = [
  "Flight Booking",
  "Vacation Packages",
  "Car Rental Services",
  "Adventure Travel Planning",
  "Group Travel Organization",
  "Insurance Services",
];

const sampleTags = [
  "Travel Planning",
  "Safety Guides",
  "Spa Retreats",
  "Wine Tours",
  "Travel Pack",
  "Solo Travel",
  "Travel Programs",
];

const sampleExcerpt =
  "Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis viverra laoreet augue mattis fermentum ullamcorper viverra laoreet Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis viverra laoreet augue mattis fermentum ullamcorper viverra laoreet Aliquam eros justo, posuere loborti";

const postsPerPage = 2;

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

function uniqueValues(values) {
  return [...new Set(values.map((value) => value?.trim()).filter(Boolean))];
}

function BlogSecondPart() {
  const [posts, setPosts] = useState(null);
  const [commentsByPost, setCommentsByPost] = useState({});

  useEffect(() => {
    let isActive = true;
    fetchPublishedPosts().then(async (rows) => {
      if (!isActive || !rows?.length) return;
      setPosts(rows);
      const comments = await fetchApprovedComments(rows.map((post) => post.id));
      if (!isActive) return;
      const grouped = {};
      for (const comment of comments) {
        (grouped[comment.post_id] ??= []).push(comment);
      }
      setCommentsByPost(grouped);
    });
    return () => {
      isActive = false;
    };
  }, []);

  const hasPosts = Boolean(posts);
  const articles = hasPosts
    ? posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        cover: post.cover_image_url,
        author: `By ${post.author_name}`,
        date: formatPostDate(post.published_at),
      }))
    : sampleArticles.map((article) => ({
        ...article,
        content: sampleExcerpt,
        author: postMeta.author,
        date: postMeta.date,
      }));
  const popularPosts = hasPosts
    ? (posts.some((post) => post.is_popular)
        ? posts.filter((post) => post.is_popular)
        : posts
      )
        .slice(0, 3)
        .map((post) => ({
          id: post.id,
          title: post.title,
          cover: post.cover_image_url,
          date: formatPostDate(post.published_at),
        }))
    : samplePopularPosts.map((title) => ({ id: title, title, date: postMeta.date }));
  const categories = hasPosts
    ? uniqueValues(posts.map((post) => post.category))
    : sampleCategories;
  const tags = hasPosts ? uniqueValues(posts.flatMap((post) => post.tags ?? [])) : sampleTags;

  const [expandedPosts, setExpandedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchTerms = normalizedQuery.split(/\s+/);
  const filteredArticles = articles.filter((article) => {
    const titleWords = article.title.toLowerCase().split(/\s+/);
    return searchTerms.every((term) =>
      titleWords.some((word) => word.startsWith(term)),
    );
  });
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const visibleArticles = filteredArticles.slice(firstPostIndex, firstPostIndex + postsPerPage);

  function updateSearch(value) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleSearch(event) {
    event.preventDefault();
    setCurrentPage(1);
    sectionRef.current?.scrollIntoView({ block: "start" });
  }

  function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ block: "start" });
  }

  function togglePost(postId) {
    setExpandedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 pb-[24px] pt-0 text-black sm:px-8 sm:pb-[100px]"
    >
      <div className="mx-auto max-w-[1000px]">
        <div className="grid gap-[32px] sm:grid-cols-[1.55fr_0.75fr] sm:grid-rows-[auto_1fr] sm:items-start sm:gap-x-[28px] sm:gap-y-[18px]">
          <div className="min-w-0 sm:col-start-2 sm:row-start-1">
            <SidebarCard title="Search Here">
              <form
                role="search"
                aria-label="Search blog posts"
                onSubmit={handleSearch}
                className="flex h-[42px] items-center rounded-full border border-[#E3DBD8] bg-white pl-[16px] pr-[12px] focus-within:border-[color:var(--avac-gold)] focus-within:ring-1 focus-within:ring-[color:var(--avac-gold)]"
              >
                <label htmlFor="blog-post-search" className="sr-only">
                  Search posts
                </label>
                <input
                  id="blog-post-search"
                  name="search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => updateSearch(event.target.value)}
                  aria-controls="blog-post-list"
                  placeholder="Search.."
                  className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#000000] outline-none placeholder:text-[#727272]"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)]"
                >
                  <img
                    src="/searchIcon.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-[16px] w-[16px] object-contain"
                  />
                </button>
              </form>
            </SidebarCard>
          </div>
          <div className="min-w-0 sm:col-start-1 sm:row-span-2 sm:row-start-1">
            <p role="status" aria-atomic="true" className="sr-only">
              {filteredArticles.length} {filteredArticles.length === 1 ? "post" : "posts"} found.
            </p>
            <div id="blog-post-list" className="space-y-[50px]">
              {filteredArticles.length === 0 && (
                <div className="rounded-[16px] border border-[#E3DBD8] bg-white px-[24px] py-[32px]">
                  <p className="break-words text-[14px] leading-[1.8] text-[#727272]">
                    No posts found for &ldquo;{searchQuery.trim()}&rdquo;. Try a different search.
                  </p>
                  <button
                    type="button"
                    onClick={() => updateSearch("")}
                    className="mt-[12px] cursor-pointer text-[14px] font-medium text-[color:var(--avac-gold)] underline underline-offset-4"
                  >
                    Clear search
                  </button>
                </div>
              )}
              {visibleArticles.map((article) => (
                <article key={article.id}>
                  <div className="h-[220px] overflow-hidden rounded-[10px] bg-[#D9D9D9] sm:h-[312px]">
                    {article.cover && (
                      <img
                        src={article.cover}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="mt-[12px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[12px] text-[#111214]">
                    <span className="flex items-center gap-[5px]">
                      <img
                        src="/blogUser.png"
                        alt=""
                        aria-hidden="true"
                        className="h-[11px] w-[11px] object-contain"
                      />
                      <span>{article.author}</span>
                    </span>
                    <span className="flex items-center gap-[3px]">
                      <img
                        src="/blogCalender.png"
                        alt=""
                        aria-hidden="true"
                        className="h-[11px] w-[11px] object-contain"
                      />
                      <span>{article.date}</span>
                    </span>
                    {hasPosts && (
                      <span className="flex items-center gap-[3px]">
                        <img
                          src="/blogComments.png"
                          alt=""
                          aria-hidden="true"
                          className="h-[14px] w-[14px] object-contain"
                        />
                        <span>
                          Comments (
                          {String(commentsByPost[article.id]?.length ?? 0).padStart(2, "0")})
                        </span>
                      </span>
                    )}
                  </div>

                  <h2 className="mt-[14px] max-w-[600px] text-[34px] font-bold leading-[1.06] text-[#000000]">
                    {article.title}
                  </h2>

                  <p
                    id={`post-content-${article.id}`}
                    className={`mt-[14px] max-w-[640px] whitespace-pre-line text-[12px] leading-[1.9] text-[#727272] ${expandedPosts.includes(article.id) ? "" : "line-clamp-3"}`}
                  >
                    {article.content}
                  </p>

                  <button
                    type="button"
                    onClick={() => togglePost(article.id)}
                    aria-expanded={expandedPosts.includes(article.id)}
                    aria-controls={`post-content-${article.id}`}
                    className="mt-[18px] inline-flex h-[45px] items-center justify-center gap-[10px] rounded-full bg-[color:var(--avac-gold)] px-[22px] text-[12px] font-medium text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--avac-gold)]"
                  >
                    <span>
                      {expandedPosts.includes(article.id) ? "Show Less" : "Learn More"}
                    </span>
                    <img
                      src="/smallArrow.png"
                      alt=""
                      aria-hidden="true"
                      className={`mt-[2px] h-[9px] w-[10px] object-contain ${expandedPosts.includes(article.id) ? "rotate-180" : ""}`}
                    />
                  </button>

                  {hasPosts && expandedPosts.includes(article.id) && (
                    <BlogComments
                      postId={article.id}
                      comments={commentsByPost[article.id] ?? []}
                    />
                  )}
                </article>
              ))}
            </div>

            {totalPages > 0 && (
              <nav
                aria-label="Blog post pages"
                className="mt-[60px] flex flex-wrap items-center justify-center gap-[10px]"
              >
                {currentPage > 1 && (
                  <button
                    type="button"
                    onClick={() => changePage(currentPage - 1)}
                    aria-label="Previous blog page"
                    aria-controls="blog-post-list"
                    className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)]"
                  >
                    <img
                      src="/brownArrow.png"
                      alt=""
                      aria-hidden="true"
                      className="h-[12px] w-[12px] rotate-180 object-contain"
                    />
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => changePage(page)}
                      aria-label={`Go to blog page ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                      aria-controls="blog-post-list"
                      className={`flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)] ${
                        page === currentPage
                          ? "border-[color:var(--avac-gold)] text-[color:var(--avac-gold)]"
                          : "border-[#E3DBD8] text-[#734611]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next blog page"
                  aria-controls="blog-post-list"
                  className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E3DBD8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--avac-gold)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <img
                    src="/brownArrow.png"
                    alt=""
                    aria-hidden="true"
                    className="h-[12px] w-[12px] object-contain"
                  />
                </button>
              </nav>
            )}
          </div>

          <aside className="space-y-[18px] sm:col-start-2 sm:row-start-2">
            <SidebarCard title="Popular Post">
              <div className="space-y-[12px]">
                {popularPosts.map((post) => (
                  <div key={post.id} className="flex gap-[12px]">
                    <div className="h-[59px] w-[59px] shrink-0 overflow-hidden rounded-[12px] bg-[#D9D9D9]">
                      {post.cover && (
                        <img src={post.cover} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-[4px] text-[12px] text-[#727272]">
                        <img
                          src="/greenCalender.png"
                          alt=""
                          aria-hidden="true"
                          className="h-[12px] w-[12px] object-contain"
                        />
                        <span>{post.date}</span>
                      </div>
                      <p className="mt-[4px] max-w-[160px] text-[13px] leading-[1.45] font-semibold text-[color:var(--avac-gold)]">
                        {post.title}
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
