import ContactIntro from "./ContactIntro";
import { useApplicationForm } from "../lib/useApplicationForm";

function FieldLabel({ children }) {
  return (
    <span className="mb-[8px] block text-[12px] font-medium text-[#3d3d3d]">
      {children}
    </span>
  );
}

function InputShell({ children, icon, textarea = false }) {
  return (
    <div className="relative">
      {children}
      <img
        src={icon}
        alt=""
        className={`pointer-events-none absolute right-[18px] ${
          textarea ? "top-[18px]" : "top-1/2 -translate-y-1/2"
        } h-[14px] w-[14px] object-contain opacity-90`}
      />
    </div>
  );
}

function AboutUsContactInfo() {
  const { handleSubmit, isSending, error, success } = useApplicationForm("about");

  return (
    <div className="mx-auto grid max-w-[1000px] gap-[24px] sm:grid-cols-[0.9fr_1fr] sm:items-center sm:gap-[34px]">
      <div className="flex justify-center sm:justify-start sm:pl-[10px]">
        <ContactIntro />
      </div>

      <div className="mx-auto w-full max-w-[640px]">
        {/* <div className="flex items-center gap-[10px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
            Contact Information
          </p>
          <img
            src="/paperRocket.svg"
            alt=""
            className="h-[12px] w-[18px] object-contain"
          />
        </div>

        <h2 className="mt-[8px] max-w-[420px] text-[34px] font-bold leading-[1.06] text-[color:var(--avac-gold)] sm:text-[38px]">
          Get in Touch
          <span className="block">Guide You</span>
        </h2> */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-0 rounded-[18px] bg-white px-[18px] pb-[24px] pt-[20px] shadow-[0_18px_60px_rgba(51,45,18,0.08)] sm:mt-[18px] sm:rounded-[20px] sm:px-[20px] sm:pb-[26px] sm:pt-[30px]">
          <div className="grid gap-x-[18px] gap-y-[14px] sm:grid-cols-2">
            <label className="col-span-full block">
              <FieldLabel>Your Name</FieldLabel>
              <InputShell icon="/contactName.png">
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Your Name (in full)"
                  className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
                />
              </InputShell>
            </label>

            <label className="block">
              <FieldLabel>Your Email</FieldLabel>
              <InputShell icon="/contactRocket.png">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Your Email"
                  className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
                />
              </InputShell>
            </label>

            <label className="block">
              <FieldLabel>Your Phone</FieldLabel>
              <InputShell icon="/contactPhone.png">
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Your Phone"
                  className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
                />
              </InputShell>
            </label>

            <label className="block">
              <FieldLabel>Passport Number (optional)</FieldLabel>
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
              />
            </label>

            <label className="block">
              <FieldLabel>Passport Expiry Date (optional)</FieldLabel>
              <input
                type="date"
                name="passportExpiry"
                className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
              />
            </label>
          </div>

          <label className="mt-[14px] block">
            <FieldLabel>Your Address</FieldLabel>
            <InputShell icon="/contactLocation.png">
              <input
                type="text"
                name="address"
                autoComplete="street-address"
                placeholder="Your Address"
                className="h-[48px] w-full rounded-full border border-[#ebe4dc] bg-white px-[16px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
              />
            </InputShell>
          </label>

          <label className="mt-[14px] block">
            <FieldLabel>Message</FieldLabel>
            <InputShell icon="/contactMail.png" textarea>
              <textarea
                name="message"
                placeholder="Write Message.."
                rows="5"
                className="min-h-[108px] w-full resize-none rounded-[18px] border border-[#ebe4dc] bg-white px-[16px] py-[14px] pr-[42px] text-[12px] text-[#1f1f1f] outline-none transition focus:border-[color:var(--avac-gold)]"
              />
            </InputShell>
          </label>

          <button
            type="submit"
            disabled={isSending}
            className="mx-auto mt-[20px] flex h-[52px] w-full max-w-[170px] cursor-pointer items-center justify-center rounded-full bg-[color:var(--avac-gold)] px-[24px] text-[11px] font-semibold text-white transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>

          <p role="alert" className="text-center text-[12px] text-red-700 empty:hidden mt-[12px]">
            {error}
          </p>
          <p role="status" className="text-center text-[12px] text-[color:var(--avac-gold)] empty:hidden mt-[12px]">
            {success}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AboutUsContactInfo;
