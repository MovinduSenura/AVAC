const serviceLinks = ["Find a Job", "Hire Talent"];
const usefulLinks = ["Latest News", "General Inquiries", "Testimonials"];
const socialLinks = [
  { icon: "/fb.svg", label: "Facebook" },
  { icon: "/insta.svg", label: "Instagram" },
  { icon: "/twitter.svg", label: "Twitter" },
  { icon: "/linkedin.svg", label: "LinkedIn" },
];

function Footer() {
  return (
    <footer className="bg-black px-4 pb-[24px] pt-[10px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1000px] pb-[32px] pt-[28px] sm:pb-[36px] sm:pt-[32px] lg:pb-[38px]">
        <div className="grid gap-[32px] border-b border-white/10 pb-[40px] sm:grid-cols-2 sm:gap-[36px] sm:pb-[48px] lg:grid-cols-[1.2fr_0.72fr_0.72fr_1.1fr] lg:pb-[56px]">
          <div>
            <div className="flex items-center gap-[12px]">
              <img
                src="/favicon.svg"
                alt="AVA Consultants logo"
                className="h-[22px] w-[22px] rounded-full object-cover"
              />
              <p className="text-[22px] font-medium tracking-[-0.03em] text-white">
                AVA Consultants
              </p>
            </div>

            <div className="mt-[15px] space-y-[6px] text-[14px] leading-[1.65] text-white/78">
              <p>No. 80/21 Roseville Place, Dalugama,</p>
              <p>Kelaniya, Sri Lanka.</p>
              <p>info@avaconsultants.org</p>
            </div>

            <div className="mt-[22px] flex items-center gap-[14px]">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="transition hover:opacity-80"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="h-[13px] w-[13px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[18px] font-semibold text-white">Service Menu</p>
            <div className="mt-[22px] space-y-[16px]">
              {serviceLinks.map((link) => (
                <p
                  key={link}
                  className="flex items-center gap-[10px] text-[13px] text-white/80"
                >
                  <img
                    src="/goldTick.png"
                    alt=""
                    className="h-[10px] w-[10px] object-contain"
                  />
                  <span>{link}</span>
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[18px] font-semibold text-white">Useful Links</p>
            <div className="mt-[22px] space-y-[16px]">
              {usefulLinks.map((link) => (
                <p
                  key={link}
                  className="flex items-center gap-[10px] text-[13px] text-white/80"
                >
                  <img
                    src="/greenArrow.png"
                    alt=""
                    className="h-[10px] w-[10px] object-contain"
                  />
                  <span>{link}</span>
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[18px] font-semibold text-white">
              Subscribe Our Newsletter
            </p>
            <p className="mt-[20px] max-w-[290px] text-[14px] leading-[1.8] text-white/72">
              Corporate business typically refers to large-scale mansola it.
            </p>

            <div className="mt-[24px] flex max-w-[340px] items-center overflow-hidden rounded-full border border-white/10 bg-[#151515] pl-[18px]">
              <input
                type="email"
                placeholder="Enter Email"
                className="h-[52px] flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white"
              />
              <button
                type="button"
                className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[color:var(--avac-gold)] cursor-pointer"
              >
                <img
                  src="/footerRocket.png"
                  alt=""
                  className="h-[13px] w-[13px] object-contain"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[22px] flex flex-col items-center justify-between gap-[12px] text-center text-[12px] text-white/45 lg:flex-row lg:text-left">
          <p>&copy; AVA Consultants 2026 | All Rights Reserved</p>
          <div className="flex flex-wrap justify-center gap-[18px] sm:gap-[22px] lg:justify-start">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
