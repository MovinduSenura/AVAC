import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-20 h-[68px] bg-black min-[1085px]:h-[80px]">
      <nav className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-[26px] py-[10px] text-white min-[1085px]:px-6 min-[1085px]:py-[23px] min-[1085px]:pl-[90px]">
        <Link to="/" className="flex min-w-0 items-center gap-[8px]">
          <img
            src="/favicon.svg"
            alt="AVA Consultants logo"
            className="h-[36px] w-[36px] rounded-full object-cover min-[1085px]:h-[30px] min-[1085px]:w-[30px]"
          />
          <span className="hidden max-w-[220px] truncate text-[14px] font-normal tracking-[-0.06em] text-white min-[1200px]:inline min-[1200px]:max-w-none min-[1200px]:text-[19px]">
            AVA Consultants (Private) Limited
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 min-[1085px]:flex">
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
          className="hidden items-center gap-[8px] min-[1085px]:flex"
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

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex items-center justify-center min-[1085px]:hidden"
        >
          <img
            src={isMenuOpen ? "/mobClose.svg" : "/mobThreeLines.svg"}
            alt=""
            aria-hidden="true"
            className="h-[26px] w-[30px] object-contain"
          />
        </button>
      </nav>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[color:var(--avac-gold)]" />

      <div
        className={`fixed inset-x-0 bottom-0 top-[68px] z-10 bg-black transition-all duration-700 ease-in-out min-[1085px]:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center gap-[32px]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-center text-[18px] font-medium uppercase leading-none tracking-[0.02em] text-[color:var(--avac-gold)] [word-spacing:0.18em]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
