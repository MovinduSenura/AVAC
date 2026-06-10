import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function NavBar() {
  const location = useLocation();

  return (
    <header className="relative z-20 h-[80px] overflow-hidden bg-black">
      <nav className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-4 py-[18px] text-white sm:px-6 sm:py-[20px] lg:px-6 lg:py-[23px] lg:pl-[90px]">
        <Link to="/" className="flex min-w-0 items-center gap-[8px]">
          <img
            src="/favicon.svg"
            alt="AVA Consultants logo"
            className="h-[24px] w-[24px] rounded-full object-cover sm:h-[28px] sm:w-[28px] lg:h-[30px] lg:w-[30px]"
          />
          <span className="max-w-[220px] truncate text-[14px] font-normal tracking-[-0.06em] text-white sm:max-w-[360px] sm:text-[16px] lg:max-w-none lg:text-[19px]">
            AVA Consultants (Private) Limited
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive =
              (item.label === "Home" && location.pathname === "/") ||
              (item.label === "About Us" && location.pathname === "/about") ||
              (item.label === "Contact Us" &&
                location.pathname === "/contact") ||
              (item.label === "Blog" && location.pathname === "/blog");

            const className = `inline-flex h-[26px] min-w-[68px] items-center justify-center rounded-[25px] px-[14px] text-center text-[12px] uppercase leading-none tracking-[1.2px] transition-colors ${
              isActive
                ? "bg-[color:var(--avac-gold)] font-semibold text-white"
                : "font-medium text-[color:var(--avac-gold)]"
            }`;

            const content = (
              <span className="inline-flex h-full items-center justify-center translate-y-[-0.5px]">
                {item.label}
              </span>
            );

            return item.href.startsWith("/") ? (
              <Link key={item.label} to={item.href} className={className}>
                {content}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={className}>
                {content}
              </a>
            );
          })}
        </div>

        <a
        //   href="tel:+94112986827"
          className="hidden items-center gap-[8px] lg:flex"
        >
          <div className="flex items-center justify-center">
            <img
              src="/chat_logo.png"
              alt="chat logo"
              className="h-[40px] w-[40px] object-cover"
            />
          </div>

          <div className="pt-[1px]">
            <p className="text-[13px] font-normal text-[#727272]">
              Need help?
            </p>
            <p className="mt-[1px] text-[15px] font-semibold text-[color:var(--avac-gold)]">
              (+94) 11 298 6827
            </p>
          </div>
        </a>
      </nav>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[color:var(--avac-gold)]" />
    </header>
  );
}

export default NavBar;
