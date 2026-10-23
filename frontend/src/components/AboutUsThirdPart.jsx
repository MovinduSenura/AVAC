const reasons = [
  "We can be trusted",
  "Transparent",
  "Client focused",
  "Accuracy driven documentation",
  "Personalized service tailored to your needs",
  "Expert advice from experienced consultants",
  "Strong industry connections and partnerships",
];

const employeeServices = [
  "Work permit and visa guidance",
  "Employer documentation support",
  "Visa file preparation and compliance review",
  "Interview preparation",
  "Appeal and reconsideration support",
  "Pre-departure advice",
];

function AboutUsThirdPart() {
  return (
    <section className="bg-white px-4 pb-0 pt-[44px] text-black sm:px-8 sm:pb-[0px] sm:pt-[70px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="grid gap-[0px] sm:grid-cols-[0.95fr_1.15fr] sm:items-start sm:gap-[0px]">
          <div className="mx-auto w-full">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/whyChooseBig.png"
                alt="Team reviewing work together on a laptop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="pt-[40px] sm:pt-[8px] sm:pl-[50px]">
            <div className="flex items-center gap-[6px]">
                <img
                src="/whyChoose.png"
                alt=""
                className="h-[12px] w-[18px] object-contain"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
                Why Choose Us
              </p>              
            </div>

            <h2 className="mt-[14px] max-w-[640px] text-[34px] font-bold leading-[1.06] text-[#1c1d22]">
              Why Clients Choose <span className="text-[color:var(--avac-gold)]">AVAC</span>
              {/* <span className="block text-[color:var(--avac-gold)]">
                Dream Destinations
              </span> */}
            </h2>

            <ul className="mt-[16px] grid max-w-[500px] grid-cols-1 gap-[11px]">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-[10px] rounded-[12px] border border-[#e6d5b5] bg-white px-[16px] py-[11px] text-[14px] leading-[1.6] text-[#3d3d3d]"
                >
                  <img
                    src="/goldTick.png"
                    alt=""
                    aria-hidden="true"
                    className="mt-[5px] h-[12px] w-[12px] shrink-0 object-contain"
                  />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative left-1/2 mt-[44px] w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#ffffff_0_25%,#000000_18%_100%)] px-[14px] pb-[16px] pt-[34px] sm:mt-[0px] sm:px-[22px] sm:pb-[80px] sm:pt-[40px]">
          <section
            aria-labelledby="expertise-heading"
            className="mx-auto max-w-[1450px] overflow-hidden rounded-[26px] bg-[#F1F5EB] px-[24px] py-[36px] sm:px-[40px] sm:py-[48px]"
            style={{
              backgroundImage: 'url("/pattern.png")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="mx-auto max-w-[1000px]">
          <div className="flex items-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Our Expertise & Services
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>
          <h2
            id="expertise-heading"
            className="mt-[14px] text-[34px] font-bold leading-[1.06] text-[#1c1d22]"
          >
            Turning Dreams Into Destinations{" "}
            <span className="text-[color:var(--avac-gold)]">
              Discover Your Next Move
            </span>
          </h2>

          <div className="mt-[28px] grid gap-[28px] sm:grid-cols-2 sm:gap-[48px]">
            <div>
              <h3 className="text-[15px] font-bold text-[color:var(--avac-gold)]">
                To the Employee
              </h3>
              <ul className="mt-[14px] list-[square] space-y-[8px] pl-[18px] text-[14px] leading-[1.5] text-[#000000] marker:text-[color:var(--avac-gold)]">
                {employeeServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[color:var(--avac-gold)]">
                To the Employer
              </h3>
              <ul className="mt-[14px] list-[square] pl-[18px] text-[14px] leading-[1.5] text-[#000000] marker:text-[color:var(--avac-gold)]">
                <li>
                  We support the employer&apos;s productivity by helping choose the
                  most suitable candidate against the required eligibility criteria.
                </li>
              </ul>
            </div>
          </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default AboutUsThirdPart;
