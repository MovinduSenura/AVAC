const contactItems = [
  {
    icon: "/goldPhone.svg",
    label: "Call for inquiry",
    value: "(+94) 11298-6827",
  },
  {
    icon: "/goldMail.svg",
    label: "E-mail",
    value: "info@avaconsultants.org",
  },
  {
    icon: "/goldLocation.svg",
    label: "Location",
    value: "No. 80/21 Roseville Place,\nDalugama, Kelaniya,\nSri Lanka.",
  },
];

const officeHours = [
  {
    label: "Monday",
    hours: "9 am - 5 pm",
  },
  {
    label: "Tuesday-Friday",
    hours: "10 am - 6 pm",
  },
  {
    label: "Saturday",
    hours: "9 am - 3 pm",
  },
];

function ContactUsSecondPart() {
  return (
    <section className="bg-white px-4 pb-[68px] pt-[0px] text-black sm:px-6 sm:pb-[78px] lg:px-8 lg:pb-[92px]">
      <div className="mx-auto max-w-[1450px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Contact Information
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>

          <h2 className="mt-[14px] text-[34px] font-bold leading-[1.06] text-[color:var(--avac-gold)] sm:text-[38px] lg:text-[34px]">
            You Will Grow, You Will Succeed.
            <span className="block">We Promise That</span>
          </h2>

          <p className="mx-auto mt-[16px] max-w-[620px] text-[13px] leading-[1.8] text-[#000000] sm:text-[14px]">
            Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in
            lectus tincidunt tincidunt ultrices. <br/> Diam convallis morbi
            pellentesque adipiscing
          </p>
        </div>

        <div className="mx-auto mt-[38px] max-w-[1170px] rounded-[24px] bg-white px-[20px] py-[20px] shadow-[0_24px_80px_rgba(174,150,111,0.16)] sm:px-[28px] sm:py-[28px] lg:mt-[52px] lg:px-[45px] lg:py-[45px]">
          <div className="grid gap-[26px] lg:grid-cols-[1.02fr_0.92fr_1.22fr] lg:items-center lg:gap-[34px]">
            <div className="space-y-[18px] lg:pl-[6px]">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-[16px]">
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="mt-[15px] h-[22px] w-[22px] shrink-0 object-contain"
                  />
                  <div>
                    <p className="text-[12px] text-[#727272]">{item.label}</p>
                    <p className="mt-[4px] max-w-[250px] whitespace-pre-line text-[19px] leading-[1.5] font-medium text-[color:var(--avac-gold)]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-[#ece4d8] lg:border-l lg:pl-[42px]">
              <div className="space-y-[16px]">
                {officeHours.map((item) => (
                  <div key={item.label}>
                    <p className="text-[12px] text-[#727272]">{item.label}</p>
                    <div className="mt-[5px] flex items-center gap-[10px]">
                      <img
                        src="/goldTime.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-[16px] w-[16px] object-contain"
                      />
                      <p className="text-[18px] font-medium text-[color:var(--avac-gold)]">
                        {item.hours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/contactUsLady.png"
                alt="Customer support specialist speaking through a headset"
                className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsSecondPart;
