import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const linkClassName = "rounded-sm underline underline-offset-4 hover:text-[color:var(--avac-gold)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--avac-gold)]";

const sections = [
  {
    title: "Who we are",
    blocks: [
      <span className="text-blue-700">AVA is the umbrella brand under which two separately incorporated Sri Lankan companies operate:</span>,
      <>
        <strong>AVAC</strong>
        <br />
        AVA Consultants (Pvt) Ltd, company registration number <strong>PV 00299042</strong>, provides migration consultation, visa guidance and application support. Address: 80/21, Roseville Place, Dalugama, Kelaniya, Sri Lanka.
      </>,
      <>
        <strong>AVAFE</strong>
        <br />
        AVA Foreign Employment (Pvt) Ltd, company registration number <strong>PV 00369436</strong>, provides foreign recruitment and overseas job placement services, subject to applicable licensing and regulatory approvals. Address: Office 3-7, 94, Makola Road, Kiribathgoda, Sri Lanka.
      </>,
      "In this Policy, “we”, “us” and “our” mean the company responsible for the relevant processing. Your quotation, service agreement or receipt identifies your service provider. That company is generally responsible for deciding why and how your service information is used. If both companies are involved, we will explain their respective roles where required. Sharing the AVA brand does not give either company unrestricted access to the other company’s client records.",
      <>
        This Policy covers personal information collected through <a href="https://avac-murex.vercel.app/" className={`${linkClassName} break-words text-red-600`}>https://avac-murex.vercel.app/</a>, <span className="text-red-600">enquiries</span>, consultations and related migration and recruitment services, whether supplied online, by email, telephone, messaging applications or in person.
      </>,
    ],
  },
  {
    title: "Information we collect",
    blocks: [
      "The information required depends on your enquiry or service. It may include:",
      [
        "Identity and contact details: name, date of birth, nationality, address, telephone number, email address, photograph, signature, passport, national identity card and residence permit details.",
        "Application and employment details: CV, qualifications, skills, professional licences, work history, references, employment agreements, job preferences, immigration history, previous visa decisions and travel plans.",
        "Supporting records: bank statements, income and salary records, proof of funds, accommodation details, property records, marriage and birth certificates, and relevant family or dependent information.",
        "Sensitive or specially protected information: medical or fitness reports, police clearance records and other information receiving additional legal protection, only where needed for the particular process and legally permitted.",
        "Service records: correspondence, instructions, application records, agreements, payment confirmations, receipts and complaint information.",
        "Website information: IP address, device and browser information, pages requested, access times and technical error or security logs, to the extent collected by the website and its providers.",
      ],
      "We do not need every document for every enquiry. Please provide only information requested for your service. Passport photographs are not necessarily biometric identification data; any processing for biometric identification requires separate consideration and appropriate notice.",
    ],
  },
  {
    title: "How we obtain information",
    blocks: [
      "We collect information directly from you and, where appropriate and lawful, from an authorized representative, employer, recruitment partner, referee, service provider or relevant authority. We may also receive updates from application systems used for your case.",
      "If you provide information about a spouse, dependent, referee or another person, ensure you have an appropriate basis to share it and make this Policy available to them. We may need to contact them or obtain their authorization directly.",
    ],
  },
  {
    title: "Why we use information",
    blocks: [
      "We use relevant information to respond to enquiries; assess eligibility and suitability; prepare, review and coordinate applications; arrange appointments; match candidates with relevant vacancies; coordinate with employers and service providers; communicate progress; administer agreements and payments; maintain required records; resolve complaints; prevent fraud; and operate and protect our website and services.",
      "Where data protection law requires a legal basis, we identify one appropriate to the activity. This may include steps requested before entering a contract, performance of a contract with you, compliance with a legal obligation, your specific consent, or a legitimate interest recognized by applicable law, such as maintaining security or handling a dispute, subject to a balancing assessment and applicable safeguards.",
      "Sensitive information and police clearance or criminal record information requires any additional legal conditions and protections applicable to that category. A service contract alone does not necessarily permit every use of such information.",
      "Browsing the website, sending an enquiry or accepting our Terms does not give blanket consent to all processing. Where consent is required, we seek it separately and explain the purpose. You may withdraw consent by contacting us. Withdrawal does not affect earlier lawful processing; it may prevent a particular optional activity or a service step that depends on that consent.",
    ],
  },
  {
    title: "Information required for your service",
    blocks: [
      "Some information is necessary to assess your request, meet an authority’s requirements or carry out an agreed service. We will explain relevant requirements when requesting it. If necessary, information is not supplied, we may be unable to proceed. Optional marketing choices do not determine whether you can use our core services.",
      "Please keep information accurate and notify us promptly of changes. Where another organization controls an application already submitted, corrections may also need to be requested from that organization.",
    ],
  },
  {
    title: "Who may receive information",
    blocks: [
      "We share only information relevant to the purpose and with an appropriate legal basis. Depending on your case, recipients may include:",
      [
        "Embassies, consulates, immigration departments, application centers and other competent authorities, including the Sri Lanka Bureau of Foreign Employment where relevant.",
        "Prospective or confirmed employers, authorized recruitment partners and overseas representatives involved in your application or placement.",
        "Insurers, medical providers, translators, document authentication providers, couriers and travel or accommodation providers where their involvement is required or requested.",
        "Technology providers supporting hosting, communications, document storage, security and business administration, and professional advisers who need access for their work.",
        "Regulators, courts, law enforcement or other recipients where disclosure is legally required or lawfully necessary to establish, exercise or defend legal rights.",
      ],
      "Information may pass between AVAC and AVAFE when needed for a service you have requested and when legally permitted. We explain material additional purposes and obtain consent where required. We do not sell your personal information.",
      "Authorities and independent employers or providers may make their own decisions about information they receive and apply their own privacy notices. Providers processing information on our behalf must be subject to appropriate confidentiality, security and processing arrangements.",
    ],
  },
  {
    title: "Overseas transfers",
    blocks: [
      "Migration and overseas recruitment may require information to be sent to the destination country or another country involved in an application, placement or supporting service. Hosting, communications and storage providers may also process information outside Sri Lanka.",
      "Before making a transfer, we assess the applicable requirements and use the legal transfer mechanism and safeguards required for the circumstances. These may include recognized contractual protections or another lawful mechanism. We explain significant transfer arrangements and seek specific consent where that is the required mechanism. Overseas recipients may be subject to different laws. You may contact us for information about the destination countries, recipients and applicable safeguards for your case.",
    ],
  },
  {
    title: "Cookies and website technologies",
    blocks: [
      "Cookies are small files stored on your device. The website and its providers may use cookies or similar technologies to maintain essential functions, remember preferences, protect security or measure website use, depending on the features enabled.",
      "Where optional analytics, advertising or other non-essential technologies are used, we will provide information about their providers, purposes and duration through a cookie notice or preference tool and obtain consent before activation where required. You should be able to reject optional technologies and change your choice as easily as you accept them.",
      "You can also manage cookies through your browser, although blocking essential cookies may affect website functions. This Policy does not itself activate cookies or record your consent.",
    ],
  },
  {
    title: "Marketing and communications",
    blocks: [
      "We use your contact details for messages necessary to manage your enquiry or service. Optional vacancy alerts, newsletters and promotional messages are handled separately, with consent where required by law. You may opt out through the message instructions or by contacting us. Opting out of marketing does not stop necessary service messages.",
      "We will obtain separate permission where required before publishing a client’s photograph, testimonial, success story or identifiable application outcome.",
    ],
  },
  {
    title: "Retention and deletion",
    blocks: [
      "We retain information only for as long as reasonably necessary for the stated purpose and any applicable legal, accounting, regulatory or dispute requirements. The period depends on the record, the service and relevant legal obligations.",
      "Enquiry records are kept while needed to handle the enquiry and any reasonable follow-up. Candidate records are kept for the relevant recruitment process; keeping them for future vacancies requires a separately explained purpose and appropriate legal basis. Client files and transaction records are retained for the applicable service and statutory recordkeeping periods. Security logs and consent records are retained for their operational and legal purposes.",
      "We periodically review information and securely delete or anonymize it when no longer required. A legal hold or unresolved dispute may justify longer retention. Backup copies are removed through the relevant backup cycle and protected in the meantime. Contact us for the retention period or criteria applicable to a particular record.",
    ],
  },
  {
    title: "Security and communication channels",
    blocks: [
      "We apply reasonable technical and organizational safeguards appropriate to the information and risks, including access restrictions, confidentiality requirements and secure handling procedures. No website, messaging application or storage system can be guaranteed completely secure.",
      "Before sending passports, bank statements or medical records, ask us for the appropriate submission channel. Avoid posting documents in public comments or groups. If you communicate through WhatsApp, email or another third-party platform, that provider’s own privacy and security terms also apply. We remain responsible for our own handling of information received through those channels.",
      "If a personal data breach occurs, we will assess it, take appropriate action and notify affected people and the relevant authority when required by applicable law.",
    ],
  },
  {
    title: "Your privacy requests",
    blocks: [
      "Subject to applicable law and relevant exceptions, you may request information about our processing, access to your personal information, correction, deletion, withdrawal of consent, or an objection to or restriction of particular processing. Other rights, including review of certain automated decisions or data portability, may apply where provided by the law governing your case.",
      <>
        Send requests to <a href="mailto:md@avaconsultants.org" className={`${linkClassName} break-words`}>md@avaconsultants.org</a> with the subject “Privacy request”, identifying the relevant company and service reference if known. We may request proportionate information to verify identity or authority, but please do not send extra identity documents unless requested. We will respond within the applicable legal period and explain any lawful reason for refusing or limiting a request.
      </>,
      "Please contact us if you are concerned about our handling of your information.",
    ],
  },
  {
    title: "Children and automated decisions",
    blocks: [
      "Our services are primarily intended for adults. Where an application requires a child’s information, such as a dependent’s birth certificate, we collect only relevant details and obtain parental or guardian authority and any consent required by law. Please contact us if you believe a child’s information has been supplied improperly.",
      "Visa and employment decisions are made by the relevant authorities or employers. If we introduce solely automated decision-making that has legal or similarly significant effects, we will provide the additional information and safeguards required before using it.",
    ],
  },
  {
    title: "External websites and policy updates",
    blocks: [
      "Links to external websites do not place those websites under our control. Review their privacy notices before submitting information.",
      "We may update this Policy when our services, systems or legal requirements change. The updated version will show its effective date. We will give additional notice or obtain fresh consent where required. A policy update does not retrospectively authorize an unrelated use of information.",
    ],
  },
  {
    title: "Contact us",
    blocks: [
      "For privacy enquiries relating to either AVAC or AVAFE, contact our privacy contact using the details below and identify the company concerned:",
    ],
  },
];

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const previousTitle = document.title;
    document.title = "Privacy Policy | AVA Consultants";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <main id="privacy-policy">
        <header className="px-4 pb-[30px] pt-[26px] sm:px-8 sm:pt-[34px]">
          <div className="mx-auto max-w-[1450px] rounded-[22px] bg-[color:var(--avac-gold)] px-[26px] py-[36px] text-white sm:rounded-[26px] sm:px-[112px] sm:py-[64px]">
            <h1 className="text-[32px] font-bold leading-[1.2] sm:text-[40px]">
              Privacy Policy
            </h1>
            <nav aria-label="Breadcrumb" className="mt-[16px] text-[12px]">
              <ol className="flex flex-wrap items-center gap-[8px]">
                <li><Link to="/" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Privacy Policy</li>
              </ol>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-[1064px] px-4 pb-[64px] sm:px-8 sm:pb-[90px]">
          <div className="rounded-[16px] bg-[color:var(--avac-cream)] p-[24px] text-[14px] leading-[1.8]">
            <p className="mb-[16px] text-[16px] font-semibold">AVA (AVAC and AVAFE)</p>
            <dl className="flex flex-wrap gap-x-[40px] gap-y-[16px]">
              <div>
                <dt className="font-semibold">Effective date</dt>
                <dd className="text-[#595959]">To be confirmed</dd>
              </div>
              <div>
                <dt className="font-semibold">Last updated</dt>
                <dd className="text-[#595959]"><time dateTime="2026-10-26">27 October 2026</time></dd>
              </div>
            </dl>
          </div>

          <article aria-label="Privacy Policy" className="mt-[40px] space-y-[32px] sm:mt-[48px] sm:space-y-[40px]">
            <p className="text-justify text-[15px] leading-[1.9] text-[#4B4B4B] sm:text-[16px]">
              This Policy explains how we collect, use, share and protect personal information when you visit our website or use our migration consultation and foreign recruitment services. It also explains how to contact us about your information. Please read it alongside our <Link to="/terms-and-conditions" className={linkClassName}>Terms and Conditions</Link> and any service-specific privacy notice.
            </p>
            {sections.map((section, index) => (
              <section key={section.title} id={`privacy-section-${index + 1}`} aria-labelledby={`privacy-heading-${index + 1}`} className="scroll-mt-[24px]">
                <h2 id={`privacy-heading-${index + 1}`} className="text-[22px] font-bold leading-[1.4] text-[color:var(--avac-gold)] sm:text-[24px]">
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
                      <p><strong>AVAC:</strong> AVA Consultants (Pvt) Ltd, 80/21, Roseville Place, Dalugama, Kelaniya, Sri Lanka.</p>
                      <p><strong>AVAFE:</strong> AVA Foreign Employment (Pvt) Ltd, Office 3-7, 94, Makola Road, Kiribathgoda, Sri Lanka.</p>
                    </address>
                  )}
                </div>
              </section>
            ))}
          </article>
          <a href="#privacy-policy" className={`mt-[40px] inline-block text-[14px] font-semibold ${linkClassName}`}>Back to top</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
