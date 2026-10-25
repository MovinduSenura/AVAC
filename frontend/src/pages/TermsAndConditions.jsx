import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const sections = [
  {
    title: "About AVA",
    blocks: [
      <>
        <strong>AVA is the umbrella brand under which AVAC and AVAFE operate</strong>
        {", providing migration consultation and foreign recruitment services respectively:"}
      </>,
      [
        <>
          <strong>AVAC — AVA Consultants (Pvt) Ltd</strong>
          {", registered in Sri Lanka under company registration number "}
          <strong>PV 00299042</strong>
          {", provides migration consultation, visa guidance and application support."}
        </>,
        <>
          <strong>AVAFE — AVA Foreign Employment (Pvt) Ltd</strong>
          {", registered in Sri Lanka under company registration number "}
          <strong>PV 00369436</strong>
          {", provides foreign recruitment and overseas job placement services, subject to applicable licensing and regulatory approvals."}
        </>,
      ],
      "In these Terms, “AVA”, “we”, “us” and “our” refer to the relevant company providing the service concerned.",
      "Although both companies operate under AVA, they are separately incorporated legal entities. Your quotation, service agreement and payment receipt will identify the company responsible for your service. These Terms do not make either company automatically responsible for the other company’s contractual obligations.",
    ],
  },
  {
    title: "Acceptance and Service Agreements",
    blocks: [
      "By using this website, you agree to these Terms to the extent permitted by applicable law.",
      "Browsing the website, submitting an enquiry or sending documents does not, by itself, create a paid service agreement.",
      "Before paid services begin, the relevant company will provide a written agreement or accepted quotation setting out the scope of work, fees, payment stages and cancellation conditions.",
      "If these website Terms conflict with a specific written service agreement, that agreement will govern the relevant service, subject to applicable law.",
    ],
  },
  {
    title: "Website Information",
    blocks: [
      "This website provides general information about migration, visa applications, overseas employment and related services.",
      "Requirements, fees, eligibility criteria, vacancies and processing times may change. We take reasonable care when preparing our content, but information should be confirmed for your circumstances before you make payments, travel arrangements or other commitments.",
      "Our services do not replace advice from a lawyer or another regulated professional where such advice is required.",
    ],
  },
  {
    title: "Our Services",
    blocks: [
      "Depending on your written agreement, services may include:",
      [
        "Migration consultations and initial eligibility assessments.",
        "Guidance on visa requirements and supporting documents.",
        "Assistance with application preparation and appointment procedures.",
        "Candidate screening.",
        "Coordination with employers, overseas partners and service providers.",
        "Other assistance expressly agreed in writing.",
      ],
      "Foreign recruitment services will be undertaken only where the responsible company holds the licenses and approvals required for the activity concerned.",
      "AVAC and AVAFE are independent of embassies, consulates, immigration authorities and government agencies.",
    ],
  },
  {
    title: "No Guarantee of Approval or Employment",
    blocks: [
      "Visa decisions, work permits, residence permissions and admission to a country are determined by the relevant authorities. Employers determine candidate selection and employment offers.",
      "We do not guarantee:",
      [
        "Approval of a visa, work permit or residence application.",
        "Appointment availability or a decision within a particular period.",
        "Selection for a vacancy or receipt of a job offer.",
        "Entry to another country.",
        "Permanent residence, citizenship or continued employment.",
      ],
      "Any assessment of your prospects is based on the information available at the time and is not a promise of a particular outcome.",
    ],
  },
  {
    title: "Client Responsibilities",
    blocks: [
      "You must provide accurate, complete and genuine information and documents.",
      "You are responsible for:",
      [
        "Disclosing relevant immigration history, visa refusals and other information requested for your application.",
        "Informing us promptly of changes to your circumstances.",
        "Reviewing application details and reporting errors before submission.",
        "Meeting agreed deadlines and attending required appointments, interviews, medical examinations and other procedures.",
        "Reading and understanding documents before signing them.",
        "Complying with applicable immigration, employment and travel requirements.",
      ],
      "We may decline or suspend assistance where documents appear false, material information is withheld or a request involves unlawful conduct. Fees and refunds will be handled under your written agreement and applicable law.",
    ],
  },
  {
    title: "Fees and Payments",
    blocks: [
      "The responsible company will explain its service fees and payment conditions in writing before you engage the paid service.",
      "Additional expenses may include government fees, application centre charges, medical examinations, insurance, translations, authentication, courier services and travel costs. Your quotation or agreement will explain which charges are included and which are payable separately.",
      "Any foreign recruitment charges must comply with applicable legal requirements and regulatory limits.",
      "Payments must be made only through channels confirmed by the company identified in your service agreement. Obtain an official receipt for every payment.",
      "Verify unexpected requests to change bank details through our published contact information before transferring funds.",
    ],
  },
  {
    title: "Cancellation and Refunds",
    blocks: [
      "Cancellation and refund conditions will be provided in your written service agreement before payment.",
      "Refund assessments will consider:",
      [
        "Services already performed.",
        "Properly incurred and disclosed expenses.",
        "Whether third-party payments can be recovered.",
        "The circumstances of cancellation.",
        "Applicable law.",
      ],
      "A visa refusal, employer decision, appointment delay or change of personal plans does not automatically determine whether a refund is payable. Payment also does not automatically make every fee non-refundable.",
      "Nothing in these Terms removes any refund or remedy required by law.",
    ],
  },
  {
    title: "Processing Times and Changes",
    blocks: [
      "Processing periods and expected completion dates are estimates unless expressly agreed otherwise in writing.",
      "Authorities, employers and other providers may change procedures, requirements or availability. Where a change affects your agreed service, we will explain the known effect and discuss available options.",
      "Before booking flights, accommodation or other travel services, consider their cancellation conditions and the possibility of delays.",
    ],
  },
  {
    title: "Third-Party Providers",
    blocks: [
      "Services may involve employers, overseas partners, insurers, translators, application centres and other independent providers. Their services may be subject to separate terms.",
      "External website links are provided for convenience. We do not control those websites or their security and privacy practices.",
      "The involvement of third parties does not exclude responsibility for our own conduct or any responsibility imposed on us by law.",
    ],
  },
  {
    title: "Personal Information and Confidentiality",
    blocks: [
      "Personal information will be handled in accordance with applicable law and our Privacy Policy.",
      "Depending on your service, relevant information may need to be shared with authorities, prospective employers, overseas partners or other service providers. Our Privacy Policy explains how information is collected, used, shared, retained and protected, including relevant overseas transfers.",
      "Submitting an enquiry does not provide unrestricted permission to use your information for unrelated purposes. Marketing choices will be managed separately where required.",
      "You should provide another person’s documents only where you have appropriate authority to do so.",
    ],
  },
  {
    title: "Acceptable Website Use",
    blocks: [
      "You must not use this website to:",
      [
        "Submit false information or fraudulent documents.",
        "Impersonate another person.",
        "Upload malicious software.",
        "Interfere with website security or operation.",
        "Access systems or information without permission.",
        "Publish unlawful, abusive or misleading material.",
        "Copy or commercially exploit website content without permission.",
      ],
      "We may restrict access where reasonably necessary to protect users, maintain security or comply with the law.",
    ],
  },
  {
    title: "Intellectual Property",
    blocks: [
      "Unless otherwise stated, website branding, text, graphics and other original materials belong to the relevant AVA company or its licensors.",
      "You may use website information for personal, non-commercial reference. Reproduction, redistribution or commercial use requires permission, except where permitted by law.",
      "Documents supplied by clients remain the property of their respective owners.",
    ],
  },
  {
    title: "Website Availability and Liability",
    blocks: [
      "We take reasonable care in operating this website but cannot promise uninterrupted access or the prevention of every technical error.",
      "To the extent permitted by law, we are not responsible for losses caused solely by circumstances outside our reasonable control. We remain responsible for our own acts and omissions where the law requires.",
      "Nothing in these Terms excludes or limits liability for fraud, fraudulent misrepresentation or any liability that cannot lawfully be excluded or limited. Your statutory rights remain unaffected.",
    ],
  },
  {
    title: "Suspension or Termination",
    blocks: [
      "Either party may end a service arrangement in accordance with the written service agreement and applicable law.",
      "We may suspend or terminate services where reasonably justified by fraud, unlawful requests, serious misconduct, material non-payment or a significant breach of the agreement.",
      "Where appropriate, we will provide notice and an opportunity to resolve the issue. Outstanding payments, refunds and the return of documents will be addressed under the agreement and applicable law.",
    ],
  },
  {
    title: "Complaints and Disputes",
    blocks: [
      "Please direct complaints to the company identified in your service agreement, providing your name, service reference, a description of the issue and relevant supporting documents.",
      "We will acknowledge your complaint and explain the next steps within a reasonable period.",
      "We encourage discussion to resolve concerns. This does not prevent you from contacting a regulator, obtaining legal advice or exercising your legal rights.",
    ],
  },
  {
    title: "Changes to these Terms",
    blocks: [
      "We may update these Terms to reflect changes in our website, services or legal obligations. The revised version will display its effective date.",
      "Updates apply prospectively. Changes to an existing paid service agreement will be handled in accordance with that agreement and applicable law.",
    ],
  },
  {
    title: "Contact Details",
    blocks: [
      <strong>AVA — Migration Consultation and Foreign Recruitment</strong>,
      <>
        <strong>Migration consultation:</strong>
        <br />
        AVA Consultants (Pvt) Ltd — <strong>AVAC</strong>
        <br />
        Company registration number: <strong>PV 00299042</strong>
      </>,
      <>
        <strong>Foreign recruitment:</strong>
        <br />
        AVA Foreign Employment (Pvt) Ltd — <strong>AVAFE</strong>
        <br />
        Company registration number: <strong>PV 00369436</strong>
      </>,
      <>
        <strong>Business address:</strong>
        <span className="ml-[24px] block">
          AVAC - 80/21, Roseville Place, Dalugama, Kelaniya, Sri Lanka.
          <br />
          AVAFE - Office 3-7, 94, Makola Road, Kiribathgoda, Sri Lanka.
        </span>
      </>,
    ],
  },
];

const linkClassName = "rounded-sm underline underline-offset-4 hover:text-[color:var(--avac-gold)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--avac-gold)]";

function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const previousTitle = document.title;
    document.title = "Terms & Conditions | AVA Consultants";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <main id="terms-and-conditions">
        <header className="px-4 pb-[30px] pt-[26px] sm:px-8 sm:pt-[34px]">
          <div className="mx-auto max-w-[1450px] rounded-[22px] bg-[color:var(--avac-gold)] px-[26px] py-[36px] text-white sm:rounded-[26px] sm:px-[112px] sm:py-[64px]">
            <h1 className="text-[32px] font-bold leading-[1.2] sm:text-[40px]">
              Terms &amp; Conditions
            </h1>
            <nav aria-label="Breadcrumb" className="mt-[16px] text-[12px]">
              <ol className="flex flex-wrap items-center gap-[8px]">
                <li><Link to="/" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Terms &amp; Conditions</li>
              </ol>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-[1064px] px-4 pb-[64px] sm:px-8 sm:pb-[90px]">
          <dl className="flex flex-wrap gap-x-[40px] gap-y-[16px] rounded-[16px] bg-[color:var(--avac-cream)] p-[24px] text-[14px] leading-[1.8]">
            <div>
              <dt className="font-semibold">Effective date</dt>
              <dd className="text-[#595959]">To be confirmed</dd>
            </div>
            <div>
              <dt className="font-semibold">Last updated</dt>
              <dd className="text-[#595959]"><time dateTime="2026-11-01">1 November 2026</time></dd>
            </div>
          </dl>

          {/* <nav aria-label="Terms and Conditions sections" className="mt-[32px] rounded-[16px] border border-[#E3DBD8] p-[24px] sm:p-[32px]">
            <h2 className="text-[20px] font-bold text-[color:var(--avac-gold)]">Contents</h2>
            <ol className="mt-[16px] grid list-decimal gap-x-[40px] gap-y-[10px] pl-[22px] text-[14px] leading-[1.7] sm:grid-cols-2">
              {sections.map((section, index) => (
                <li key={section.title} value={index + 1}>
                  <a href={`#terms-section-${index + 1}`} className={linkClassName}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav> */}

          <article aria-label="Terms and Conditions" className="mt-[40px] space-y-[32px] sm:mt-[48px] sm:space-y-[40px]">
            {sections.map((section, index) => (
              <section key={section.title} id={`terms-section-${index + 1}`} aria-labelledby={`terms-heading-${index + 1}`} className="scroll-mt-[24px]">
                <h2 id={`terms-heading-${index + 1}`} className="text-[22px] font-bold leading-[1.4] text-[color:var(--avac-gold)] sm:text-[24px]">
                  {index + 1}. {section.title}
                </h2>
                <div className={`mt-[16px] space-y-[14px] text-justify text-[15px] text-[#4B4B4B] sm:text-[16px] ${index === sections.length - 1 ? "leading-[1.5]" : "leading-[1.9]"}`}>
                  {section.blocks.map((block, blockIndex) => (
                    Array.isArray(block) ? (
                      <ul key={blockIndex} className="list-disc space-y-[6px] pl-[24px] marker:text-[color:var(--avac-gold)]">
                        {block.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                      </ul>
                    ) : <p key={blockIndex}>{block}</p>
                  ))}
                  {index === sections.length - 1 && (
                    <address className="space-y-[14px] not-italic">
                      <p><strong>Email:</strong> <a href="mailto:md@avaconsultants.org" className={`${linkClassName} break-words`}>md@avaconsultants.org</a></p>
                      <p><strong>Telephone:</strong> <a href="tel:+94768965886" className={linkClassName}>+94 76 8965886</a></p>
                    </address>
                  )}
                </div>
              </section>
            ))}
          </article>
          <a href="#terms-and-conditions" className={`mt-[40px] inline-block text-[14px] font-semibold ${linkClassName}`}>Back to top</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
