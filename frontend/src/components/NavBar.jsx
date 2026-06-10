const navItems = [
  { label: "Home", href: "#home", active: true },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Blog", href: "#blog" },
];

function NavBar() {
  return (
    <header className="relative z-20 h-[80px] overflow-hidden bg-black">
      <nav className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-6 py-[23px] pl-[90px] text-white">
        <a href="#home" className="flex min-w-0 items-center gap-[8px]">
          <img
            src="/favicon.svg"
            alt="AVA Consultants logo"
            className="h-[30px] w-[30px] rounded-full object-cover"
          />
          <span className="truncate font-normal tracking-[-0.06em] text-white text-[19px]">
            AVA Consultants (Private) Limited
          </span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "inline-flex h-[26px] min-w-[68px] items-center justify-center rounded-[25px] bg-[color:var(--avac-gold)] px-[10px] text-center text-[12px] font-semibold uppercase leading-none tracking-[1.2px] text-white"
                  : "inline-flex h-[26px] items-center justify-center px-[14px] text-center text-[12px] font-medium uppercase leading-none tracking-[1.2px] text-[color:var(--avac-gold)]"
              }
            >
              <span className="inline-flex h-full items-center justify-center translate-y-[-0.5px]">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <a
        //   href="tel:+94112986827"
          className="hidden items-center gap-[8px] xl:flex"
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
