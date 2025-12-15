import { useState } from "react";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Send } from "lucide-react";

// --- Static Definitions for Dropdowns/Lists ---
const GENDERS = ["Female", "Male", "Prefer Not To Say"];
const INDIVIDUAL_JOB_TITLES = [
  "Chairman",
  "President",
  "Vice-President",
  "Director",
  "Manager",
  "Proprietor",
  "Owner",
  "Others"
];
const COMPANY_CATEGORIES = [
  { value: "Micro", label: "Micro (Less than P3M) - P1,500" },
  { value: "Small", label: "Small (P3M - P15M) - P2,500" },
  { value: "Medium", label: "Medium (P15M - P100M) - P5,000" },
  { value: "Large", label: "Large (P100M+) - P10,000" },
];
const BUSINESS_ENTITIES = [
  "Corporation",
  "Partnership",
  "Cooperative",
  "Sole Proprietorship",
  "Others",
];
const INDUSTRIES = [
  "Agriculture",
  "Food and Beverage",
  "Furniture",
  "Hospitality",
  "Manufacturing",
  "Education",
  "Retail Store",
  "Marketing Agency",
  "Web/Software",
  "Construction",
  "Logistics",
  "Utility",
  "Grocery",
  "Professional Services",
  "Travel",
  "Financial",
  "Automotive",
  "Fabrication",
  "Beauty",
  "Medical",
  "Others",
];
const COMMITTEES = [
  "Membership",
  "Revenue Generation",
  "Marketing",
  "Events",
  "Newsletter",
  "HRD",
  "Constitution",
  "Research",
  "Business Conference",
  "Sports",
  "Walk of Fame",
  "CSR",
];
const ADVOCACIES = [
  "Education",
  "Intl Biz Networking",
  "MSME",
  "Tourism",
  "Environment",
  "Legislation/Tax",
  "Innovation/Tech",
  "Youth",
  "SDG",
  "Safety",
  "Fire Protection",
];
const SOURCES = [
  "Friends/Family",
  "PCCI Member",
  "Facebook",
  "Advertisement",
  "Online Search",
];

export default function MembershipForm() {
  // 1. State to manage the active membership type, defaults to 'Individual Membership'
  const [applicantType, setApplicantType] = useState("Individual Membership");
  const isIndividual = applicantType === "Individual Membership";
  const [gender, setGender] = useState("");
  const [toast, setToast] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setToast("");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const applicantEmail =
      (isIndividual ? formData.get("email") : formData.get("corpEmail")) || "";
    const applicantName = isIndividual
      ? `${formData.get("firstName") || ""} ${
          formData.get("lastName") || ""
        }`.trim()
      : formData.get("corpCompanyName") || "Corporate Applicant";

    const fileLabel = (key) => {
      const file = formData.get(key);
      return file && file.name ? file.name : "N/A (not included in email)";
    };

    const pillList = (arr) =>
      arr.length
        ? arr
            .map(
              (item) =>
                `<span style="display:inline-block;padding:4px 8px;border-radius:9999px;background:#e2e8f0;color:#0f172a;margin:2px 4px 2px 0;font-size:12px;">${item}</span>`
            )
            .join("")
        : "N/A";

    const row = (label, value) => `
          <tr>
            <td style="padding:6px 8px;color:#475569;font-weight:600;width:40%;vertical-align:top;">${label}</td>
            <td style="padding:6px 8px;color:#0f172a;">${value || "N/A"}</td>
          </tr>`;

    const section = (title, rows) => `
          <div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;margin-bottom:12px;background:#f8fafc;">
            <h3 style="margin:0 0 8px 0;font-size:16px;color:#0f172a;">${title}</h3>
            <table style="width:100%;border-collapse:collapse;">${rows.join(
              ""
            )}</table>
          </div>`;

    const individualSection = section("Individual Membership", [
      row("First Name", formData.get("firstName")),
      row("Last Name", formData.get("lastName")),
      row("Gender", formData.get("gender")),
      row("Email", formData.get("email")),
      row("Mobile", formData.get("mobile")),
      row("Company Name", formData.get("companyName")),
      row("Company Address", formData.get("companyAddress")),
      row("Job Title", formData.get("jobTitle")),
      row("Company Category", formData.get("companyCategory")),
      row("Employee Count", formData.get("employeeCount")),
      row("Industry", formData.get("industry")),
      row("Committees", pillList(formData.getAll("committees"))),
      row("Advocacies", pillList(formData.getAll("advocacies"))),
    ]);

    const corporateSection = section("Corporate Membership", [
      row("Company Name", formData.get("corpCompanyName")),
      row("Business Entity", formData.get("businessEntity")),
      row("Owner/President", formData.get("ownerPresidentName")),
      row("Employee Count", formData.get("corpEmployeeCount")),
      row("Industry", formData.get("corpIndustry")),
      row("Nature of Business", formData.get("natureOfBusiness")),
      row("Email", formData.get("corpEmail")),
      row("Mobile", formData.get("corpMobile")),
      row("Landline", formData.get("landlineNumber")),
      row("Website", formData.get("websiteUrl")),
      row("Complete Address", formData.get("completeAddress")),
      row("Social Media Links", formData.get("socialMediaLinks")),
      row("Official Representative", formData.get("officialRepName")),
      row("Official Rep Position", formData.get("officialRepPosition")),
      row("Official Rep Contact", formData.get("officialRepContact")),
      row("Alternate Representative", formData.get("alternateRepName")),
      row("Alternate Rep Position", formData.get("alternateRepPosition")),
      row("Alternate Rep Contact", formData.get("alternateRepContact")),
      row("Business Documents", fileLabel("businessDocuments")),
      row("Government ID", fileLabel("governmentId")),
      row("Company Logo", fileLabel("companyLogo")),
      row("Profile Picture", fileLabel("profilePicture")),
    ]);

    const sharedSection = section("Submission Details", [
      row("Applicant Type", applicantType),
      row("Payment Reference", formData.get("paymentRef")),
      row("Source", formData.get("source")),
      row("Privacy Consent", formData.get("privacyConsent") ? "Yes" : "No"),
      row("Submitted At", new Date().toLocaleString()),
    ]);

    const summary = `
<html>
  <body style="font-family:'Segoe UI', Tahoma, sans-serif; background:#f3f4f6; padding:16px;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:14px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
      <h2 style="margin:0 0 4px 0;color:#0f172a;">PSME Membership Application</h2>
      <p style="margin:0 0 16px 0;color:#475569;">A new application was submitted via the membership form. Details mirror the form layout.</p>
      ${isIndividual ? individualSection : corporateSection}
      ${sharedSection}
    </div>
  </body>
</html>`;

    const subject = `Membership Application - ${applicantType}`;
    const accessKeyId =
      import.meta.env.VITE_AWS_SES_ACCESS_KEY_ID || import.meta.env.AWS_SES_ACCESS_KEY_ID;
    const secretAccessKey =
      import.meta.env.VITE_AWS_SES_SECRET_ACCESS_KEY || import.meta.env.AWS_SES_SECRET_ACCESS_KEY;
    const region =
      import.meta.env.VITE_AWS_SES_REGION_NAME || import.meta.env.AWS_SES_REGION_NAME || "aap-southeast-1";
    const emailFrom = import.meta.env.VITE_EMAIL_FROM || import.meta.env.EMAIL_FROM;
    const emailTo = import.meta.env.VITE_EMAIL_TO || import.meta.env.EMAIL_TO;

    if (!accessKeyId || !secretAccessKey || !emailFrom || !emailTo) {
      setToast("Email config missing. Please set AWS SES env keys.");
      setIsSubmitting(false);
      return;
    }

    const client = new SESClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });

    const params = new SendEmailCommand({
      Source: emailFrom,
      Destination: { ToAddresses: [emailTo] },
      ReplyToAddresses: applicantEmail ? [applicantEmail] : undefined,
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: summary, Charset: "UTF-8" },
        },
      },
    });

    try {
      await client.send(params);
      setShowSuccessModal(true);
      event.target.reset();
      setGender("");
    } catch (err) {
      setToast("Failed to send application. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Reusable Static Components (Modified to conditionally set 'required') ---

  const Field = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    children,
    helpText,
  }) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full border p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );

  const CheckboxGroup = ({ label, name, options }) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input type="checkbox" name={name} value={opt} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  // Modified RadioGroup to update the state on change
  const RadioGroup = ({
    label,
    name,
    options,
    required = false,
    currentValue,
    onChange,
  }) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              required={required}
              checked={currentValue === opt} // Control the selection
              onChange={() => onChange(opt)} // Update state on change
              className="text-blue-900 focus:ring-blue-900"
            />
            <span className="text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // --- Conditional Sections (Defined as components for clarity) ---

  const IndividualFields = (
    <section className="space-y-6">
      <div className="bg-blue-100 text-blue-900 p-2 font-bold text-center rounded">
        SECTION A: INDIVIDUAL MEMBERSHIP FIELDS
      </div>

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
        Applicant Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="2. Last Name" name="lastName" required={isIndividual} />
        <Field label="3. First Name" name="firstName" required={isIndividual} />
      </div>

      <RadioGroup
        label="4. Gender"
        name="gender"
        options={GENDERS}
        currentValue={gender}
        onChange={setGender}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="5. Email Address"
          name="email"
          type="email"
          required={isIndividual}
        />
        <Field
          label="6. Mobile Number"
          name="mobile"
          type="tel"
          required={isIndividual}
        />
      </div>

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2 mt-6">
        Business/Company Information
      </h3>

      <Field
        label="7. Company Name"
        name="companyName"
        required={isIndividual}
      />
      <Field
        label="8. Company Address"
        name="companyAddress"
        required={isIndividual}
      />

      <Field label="9. Job Title" name="jobTitle">
        <select
          name="jobTitle"
          className="w-full border p-2 rounded bg-white"
          required={isIndividual}
        >
          <option value="">Select Job Title...</option>
          {INDIVIDUAL_JOB_TITLES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="10. Company Category - Asset (Determines Fee)"
        name="companyCategory"
        required={isIndividual}
      >
        <select
          name="companyCategory"
          className="w-full border p-2 rounded bg-white"
          required={isIndividual}
        >
          <option value="">Select Category...</option>
          {COMPANY_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="11. No. of Employees"
          name="employeeCount"
          type="number"
        />
        <Field label="12. Industry" name="industry">
          <select
            name="industry"
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select Industry...</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <CheckboxGroup
        label="13. Committee Interested to Join"
        name="committees"
        options={COMMITTEES}
      />
      <CheckboxGroup
        label="14. Advocacy Interested to Join"
        name="advocacies"
        options={ADVOCACIES}
      />
    </section>
  );

  const CorporateFields = (
    <section className="space-y-6">
      <div className="bg-green-100 text-green-900 p-2 font-bold text-center rounded">
        SECTION B: CORPORATE MEMBERSHIP FIELDS
      </div>

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
        Business Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Business/Company Name"
          name="corpCompanyName"
          required={!isIndividual}
        />
        <Field label="Type of Business Entity" name="businessEntity">
          <select
            name="businessEntity"
            className="w-full border p-2 rounded bg-white"
            required={!isIndividual}
          >
            <option value="">Select Entity...</option>
            {BUSINESS_ENTITIES.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Owner/President Name"
        name="ownerPresidentName"
        required={!isIndividual}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Number of Employees"
          name="corpEmployeeCount"
          type="number"
        />
        <Field label="Nature of Business (Industry)" name="corpIndustry">
          <select
            name="corpIndustry"
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select Industry...</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Nature of Business Operations (Brief Description)"
        name="natureOfBusiness"
      >
        <textarea
          name="natureOfBusiness"
          rows="3"
          className="w-full border p-2 rounded"
        ></textarea>
      </Field>

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2 mt-6">
        Contact Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Email Address"
          name="corpEmail"
          type="email"
          required={!isIndividual}
        />
        <Field
          label="Mobile Number"
          name="corpMobile"
          type="tel"
          required={!isIndividual}
        />
        <Field
          label="Landline (Optional)"
          name="landlineNumber"
          type="tel"
          placeholder="Enter landline number"
        />
        <Field
          label="Website URL (Optional)"
          name="websiteUrl"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <Field
        label="Complete Address"
        name="completeAddress"
        required={!isIndividual}
        placeholder="Enter complete address including city and postal code"
      />
      <Field
        label="Social Media Links (Optional)"
        name="socialMediaLinks"
        placeholder="Facebook, LinkedIn, Instagram links"
      />

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2 mt-6">
        Authorized Representatives
      </h3>

      <div className="bg-blue-50 p-4 rounded-lg space-y-3">
        <h4 className="font-semibold text-blue-900">Official Representative</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <Field
            label="Full Name"
            name="officialRepName"
            required={!isIndividual}
          />
          <Field label="Position" name="officialRepPosition" />
          <Field label="Contact Number" name="officialRepContact" type="tel" />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h4 className="font-semibold text-gray-700">
          Alternate Representative (Optional)
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Full Name" name="alternateRepName" />
          <Field label="Position" name="alternateRepPosition" />
          <Field label="Contact Number" name="alternateRepContact" type="tel" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-blue-800 border-b pb-2 mt-6">
        Upload Documents
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Business Documents"
          name="businessDocuments"
          type="file"
          helpText="Upload DTI/SEC registration, business permit, etc."
          required={!isIndividual}
        />
        <Field
          label="Government ID"
          name="governmentId"
          type="file"
          helpText="Upload a valid government-issued ID"
          required={!isIndividual}
        />
        <Field label="Company Logo" name="companyLogo" type="file" />
        <Field
          label="Profile Picture (2x2 ID)"
          name="profilePicture"
          type="file"
          helpText="Upload a professional 2x2 ID photo"
        />
      </div>
    </section>
  );
  // --- End Conditional Sections ---

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your membership application has been sent successfully. We will review your application and get back to you soon.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-900 space-y-8"
      >
        {toast && (
          <div className="absolute right-4 top-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm">
            {toast}
          </div>
        )}

      {/* 1. Applicant Type Selection (Controls visibility) */}
      <section>
        <RadioGroup
          label="1. Applicant Type"
          name="applicantType"
          options={["Individual Membership", "Corporate Membership"]}
          required
          currentValue={applicantType}
          onChange={setApplicantType} // State update function
        />
      </section>

      <hr className="border-gray-300" />

      {/* Conditionally render the appropriate section */}
      {isIndividual ? IndividualFields : CorporateFields}

      <hr className="border-gray-300" />

      {/* --- SHARED FOOTER --- */}
      <section className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <label className="block text-sm font-bold text-blue-900 mb-2">
            <span className="text-red-500 mr-1">*</span>
            15. Payment Reference
          </label>
          <p className="text-xs text-gray-600 mb-2">
            Please enter your GCash/Bank Reference Number and Amount Paid.
            **(Fees are determined by the category selected in Section A/B)**
          </p>
          <textarea
            name="paymentRef"
            required
            placeholder="Ref No: XXXXXX, Amount: PHP ..."
            className="w-full border p-2 rounded h-20"
          ></textarea>
        </div>

        <Field label="16. How did you learn about us?" name="source">
          <select name="source" className="w-full border p-2 rounded bg-white">
            <option value="">Select Option...</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded border">
          <input
            type="checkbox"
            name="privacyConsent"
            required
            className="mt-1 w-4 h-4"
          />
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="text-red-500 mr-1">*</span>
            <strong>Data Privacy Notice:</strong> The data generated will be
            handled with strict confidentiality in accordance with RA 10173
            (Data Privacy Act).
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-900 text-white py-3 font-bold uppercase rounded hover:bg-blue-800 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send size={18} />{" "}
          {isSubmitting ? "Sending..." : "Submit Application"}
        </button>
      </section>
      </form>
    </>
  );
}
